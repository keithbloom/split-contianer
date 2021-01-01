export type BoundingBox = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  height: number;
  width: number;
};

export type HorizontalBoundingBox = Omit<BoundingBox, "left" | "right">;

export enum LayoutElementType {
  Top,
  Bottom,
  Splitter,
}

export type SplitDirection = 'horizontal' | 'vertical'

export type LayoutPane = {
    node: any
}

export type LayoutSplitPanel = {
    componentA: LayoutPane | LayoutSplitPanel,
    componentB: LayoutPane | LayoutSplitPanel,
    ratio: number,
    direction: SplitDirection
}

export type LayoutTree = LayoutPane | LayoutSplitPanel;