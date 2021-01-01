import React from "react";
import { Layout } from "./Layout";
import "./App.css";

const Component2 = () => (
  <Layout
    testId="B"
    componentA={
      <div style={{ border: "1px solid pink", margin: "5px" }}>Comp 2</div>
    }
    componentB={
      <div style={{ border: "1px solid blue", margin: "5px" }}>Comp 3</div>
    }
  />
);

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Test Layout</h1>
      <div className="container">
        <Layout
          testId="A"
          componentA={
            <div style={{ border: "1px solid green", margin: "5px" }}>
              This is the first component
            </div>
          }
          componentB={<Component2 />}
        />
      </div>
    </div>
  );
}

export default App;

type SplitPaneNode = {
  nodeA: SplitPaneNode | RenderNode;
  nodeB: SplitPaneNode | RenderNode;
};

type RenderNode = {
  component: JSX.Element;
};

type LayoutProps = {
  node: SplitPaneNode | RenderNode;
};
