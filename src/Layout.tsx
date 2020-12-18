import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Splitter } from "./Splitter";
import "./Layout.css";
import { JsxEmit } from "typescript";

type BoundingBox = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  height: number;
  width: number;
};

type HorizontalBoundingBox = Omit<BoundingBox, "left" | "right">;

enum ElementType {
  Top,
  Bottom,
  Splitter,
}

const getPosition = (
  containerBox: HorizontalBoundingBox,
  elementType: ElementType,
  midPoint?: number
): HorizontalBoundingBox => {
  const splitterHeight = 5;
  const { top, bottom, height, width } = containerBox;
  const topPanelHeight = midPoint ? midPoint : height / 2;

  switch (elementType) {
    case ElementType.Top: {
      return {
        top,
        width,
        bottom: topPanelHeight,
        height: topPanelHeight,
      };
    }
    case ElementType.Bottom: {
      return {
        top: topPanelHeight + splitterHeight,
        width,
        bottom,
        height: height - topPanelHeight,
      };
    }
    case ElementType.Splitter: {
      return {
        top: topPanelHeight,
        width,
        bottom: topPanelHeight + splitterHeight,
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
  componentA: React.ReactNode;
  componentB: React.ReactNode;
  splitDirection?: SplitDirection;
};

export const Layout = ({ componentA, componentB }: LayoutProps) => {
  const continerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const splitterRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [dragPosition, setDragePosition] = useState<number | undefined>(
    undefined
  );

  const [containerSize, setContainerSize] = useState<
    HorizontalBoundingBox | undefined
  >();

  useLayoutEffect(() => {
    if (continerRef.current) {
      setContainerSize(continerRef.current.getBoundingClientRect());
    }
    console.log(continerRef.current?.getBoundingClientRect());
  }, []);

  useEffect(() => {
    if (containerSize) {
      console.log(getPosition(containerSize, ElementType.Top));
    }
  }, [containerSize]);

  useEffect(() => {
    if (
      topRef.current &&
      splitterRef.current &&
      bottomRef.current &&
      containerSize
    ) {
      updateEl(
        topRef.current,
        getPosition(containerSize, ElementType.Top, dragPosition)
      );
      updateEl(
        splitterRef.current,
        getPosition(containerSize, ElementType.Splitter, dragPosition)
      );
      updateEl(
        bottomRef.current,
        getPosition(containerSize, ElementType.Bottom, dragPosition)
      );
    }
  }, [dragPosition, containerSize]);

  const handleOnChange = (position: number) => setDragePosition(position);

  return (
    <div ref={continerRef} className="container">
      {containerSize && (
        <>
          <div
            ref={topRef}
            className="top"
            style={getStyle(getPosition(containerSize, ElementType.Top))}
          >
            {componentA}
          </div>
          <Splitter
            ref={splitterRef}
            style={getStyle(getPosition(containerSize, ElementType.Splitter))}
            onChange={handleOnChange}
          />
          <div
            ref={bottomRef}
            className="bottom"
            style={getStyle(getPosition(containerSize, ElementType.Bottom))}
          >
            {componentB}
          </div>
        </>
      )}
    </div>
  );
};
