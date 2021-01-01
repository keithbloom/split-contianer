import React, { ElementType, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Splitter } from "./Splitter";
import { LayoutElementType, HorizontalBoundingBox } from "./types";

export const getPosition = (
  containerBox: HorizontalBoundingBox,
  elementType: LayoutElementType,
  midPoint?: number
): HorizontalBoundingBox => {
  const splitterHeight = 5;
  const { top, bottom, height, width } = containerBox;
  const topPanelHeight = (midPoint ? midPoint : height / 2) - top;
  const bottomPanelTop = topPanelHeight + splitterHeight;
  const bottomPanelHeight = height - topPanelHeight;
  const splitterBottom = topPanelHeight + splitterHeight;

  //console.table({elementType,topPanelHeight, bottomPanelBottom, bottomPanelHeight, splitterBottom});

  switch (elementType) {
    case LayoutElementType.Top: {
      return {
        top,
        width,
        bottom: topPanelHeight,
        height: topPanelHeight,
      };
    }
    case LayoutElementType.Bottom: {
      return {
        top: bottomPanelTop,
        width,
        bottom,
        height: bottomPanelHeight,
      };
    }
    case LayoutElementType.Splitter: {
      return {
        top: topPanelHeight,
        width,
        bottom: splitterBottom,
        height: splitterHeight,
      };
    }
  }
};

const getStyle = ({ top, bottom, height, width }: HorizontalBoundingBox) => {
  return {
    top: `${top}px`,
    bottom: `${bottom}px`,
    height: `${height}px`,
    width: `${width}px`,
  };
};

const updateEl = (el: HTMLDivElement, boundingBox: HorizontalBoundingBox) => {
  const styles = getStyle(boundingBox);
  el.style.height = styles.height;
  el.style.width = styles.width;
  el.style.top = styles.top;
  el.style.bottom = styles.bottom;
};

export enum SplitDirection {
  VERITCAL,
  HORITZONTAL,
}

export type LayoutProps = {
  testId: string,
  componentA: React.ReactNode;
  componentB: React.ReactNode;
  splitDirection?: SplitDirection;
};

export const Layout = ({ componentA, componentB, testId }: LayoutProps) => {
  const continerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const splitterRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [dragPosition, setDragPosition] = useState<number | undefined>(
    undefined
  );

  const [containerSize, setContainerSize] = useState<
    HorizontalBoundingBox | undefined
  >();

  useLayoutEffect(() => {
    console.log(`I am called ${continerRef.current?.id}`);
    console.log(continerRef.current?.getBoundingClientRect());

    if (continerRef.current) {
      const clientRect = continerRef.current.parentElement?.getBoundingClientRect();
      updateEl(
        continerRef.current,
        clientRect!
      );
      setContainerSize(clientRect);
    }
  }, []);

  useEffect(() => {
    if (
      topRef.current &&
      splitterRef.current &&
      bottomRef.current &&
      containerSize
    ) {
      updateEl(
        topRef.current,
        getPosition(containerSize, LayoutElementType.Top, dragPosition)
      );
      updateEl(
        splitterRef.current,
        getPosition(containerSize, LayoutElementType.Splitter, dragPosition)
      );
      updateEl(
        bottomRef.current,
        getPosition(containerSize, LayoutElementType.Bottom, dragPosition)
      );
    }
  }, [dragPosition, containerSize]);

  const handleOnChange = (position: number) => setDragPosition(position);

  return (
    <div ref={continerRef} id={testId}>
      {containerSize && (
        <>
          <div
            ref={topRef}
            className="top"
            style={getStyle(getPosition(containerSize, LayoutElementType.Top))}
          >
            {componentA}
          </div>
          <Splitter
            ref={splitterRef}
            style={getStyle(getPosition(containerSize, LayoutElementType.Splitter))}
            onChange={handleOnChange}
            maxHeight={containerSize.bottom}
            minHeight={containerSize.top}
          />
          <div
            ref={bottomRef}
            className="bottom"
            style={getStyle(getPosition(containerSize, LayoutElementType.Bottom))}
          >
            {componentB}
          </div>
        </>
      )}
    </div>
  );
};
