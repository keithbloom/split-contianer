import React, { useEffect, useRef } from "react";
import "./Splitter.css";

export type SplitterProps = {
  style: React.CSSProperties;
  onChange: (position: number) => void;
  maxHeight: number,
  minHeight: number
};

export const Splitter = React.forwardRef<HTMLDivElement, SplitterProps>(
  ({ style, onChange, maxHeight, minHeight }, ref: any) => {
    const splitterYPosition = useRef<number | null>(null);

    const onMouseMove = (e: MouseEvent) => {
      if (splitterYPosition.current && e.clientY > minHeight && e.clientY < maxHeight) {
        splitterYPosition.current = e.clientY;
        onChange(splitterYPosition.current);
      }
    };

    const onMouseDown = (e: React.MouseEvent) =>
      (splitterYPosition.current = e.clientY);

    const onMouseUp = () => {
      splitterYPosition.current = null;
    };

    useEffect(() => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });

    return (
      <div
        ref={ref}
        className="splitter"
        onMouseDown={onMouseDown}
        style={style}
      ></div>
    );
  }
);
