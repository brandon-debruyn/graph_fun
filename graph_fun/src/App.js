import './index.css';
import React, { useState } from 'react';

// components 
import SquareNodes from './components/SquareNodes';

function App() {

  // hooks
  // ----->
  const [grid, setGrid] = useState(() => {
    // individual nodes - returns each square's information as a object
    const squareNode = (x, y) => {
      return {
        x: x,        // x coordinate
        y: y,        // y coordinate
        nodeType: 'none'
      }
    }

    const grid = [];
  
    for(let row=0; row < 20; row++) {
      const rowElements = [];
      for(let col=0; col < 50; col++) {

        // add node to current row array -- (col, row) -> corresponds with x-axis (cols) / y-axis (rows) 
        rowElements.push(squareNode(col, row));
      }

      // add row array as row in grid
      grid.push(rowElements);
    }
    return grid;
  });

  const[sourceNode, setSourceNode] = useState({});
  const[destNode, setDestNode] = useState({});
  const[nodeSelect, setNodeSelect] = useState('none');

  // event handlers
  function handleSetStartNode(e) {
    e.preventDefault();
    setNodeSelect('start');
  }

  function handleSetDestNode(e) {
    e.preventDefault();
    setNodeSelect('dest');
  }

  function handleSetWallNodes(e) {
    e.preventDefault();
    setNodeSelect('wall');
  }  

  return(
    <>
      <div className="config-bar">
        <div className="config-bar-container">
          <header>
            <h1>Algorithm Visualizer</h1>
          </header>
          <button className='run-algorithm'>Visualize Algorithm</button>
          <div className='config-bar-settings'>
            <button className='start-node' onClick={handleSetStartNode}>Set Start Node</button>
            <button className='wall-nodes' onClick={handleSetWallNodes}>Set Wall Nodes</button>
            <button className='end-node' onClick={handleSetDestNode}>Set End Node</button>
          </div>
        </div>
      </div>
      
      <div className="grid">
        <div className="grid-container">
          {grid.map(
            (rowNodes, rowIndex) => {
              return(
                rowNodes.map( (node, colIndex) => {
                  return(
                    <SquareNodes 
                      key={rowIndex.toString() + colIndex.toString()}
                      x={node.x}
                      y={node.y}
                      nodeType={node.nodeType}      
                      grid={grid}  
                      setGrid={setGrid}      
                      sourceNode={sourceNode}
                      setSourceNode={setSourceNode}
                      destNode={destNode}
                      setDestNode={setDestNode}            
                      nodeSelect={nodeSelect}
                      setNodeSelect={setNodeSelect}          
                    />
                  );
                })
              )}
            )}
        </div>
      </div>
    </>
  );
}

export default App;
