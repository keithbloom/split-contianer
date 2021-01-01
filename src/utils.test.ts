import { LayoutSplitPanel, LayoutTree, SplitDirection } from './types'

function isLayoutSplitPanel(item: any): item is LayoutSplitPanel {
    return item.A && item.B;
}

type WidthAndHeight = {
   height: number, width: number 
}

const renderTreeFromLayout = (rootSize: WidthAndHeight, layout: LayoutTree) => {
    const nodes = [];

    if(isLayoutSplitPanel(layout)) {
    }
}

const calculateSplitSize = (size: number, ratio: number) : [number, number]  => {
    const percentage = ratio / 100;
    return [size * percentage, size - size * percentage];
}


test('single panel is split 50 50', () => {
    const layout: LayoutTree = {
        componentA: {
            node: 'A'
        },
        componentB: {
            node: 'B'
        }, 
        direction: 'horizontal',
        ratio: 80
    };


});

test('can calculate panel sizes given split ratio', () => {
    const result = calculateSplitSize(250, 50);
    expect(result).toContain(125);
});

