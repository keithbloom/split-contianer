import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Layout } from "./Layout";

function App() {
  return (
    <div>
      <h1>Test Layout</h1>
      <Layout
        componentA={<div>This is the first component</div>}
        componentB={<div>This is component B</div>}
      />
    </div>
  );
}

export default App;
