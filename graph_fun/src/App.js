import './index.css';
import React, { useState } from 'react';

// components 
import SquareNodes from './components/SquareNodes';
import bfs from './algorithms/breadth_first_search';

// global constants
const NO_GRID_ROWS = 20;
const NO_GRID_COLS = 50;

function App() {

  // hooks
  // ----->
  const [grid, setGrid] = useState(() => {
    // individual nodes - returns each square's information as a object
    const squareNode = (x, y) => {

      const getNeigbours = (x, y) => {
        let adjList = [];
        const dirs = [[-1, 0], [0, -1], [0, 1], [1, 0]];
        
          
        
        for(let i in dirs) {
          
          let nx = x + dirs[i][0];
          let ny = y + dirs[i][1];

          if(nx < 0 || nx > (NO_GRID_COLS - 1)) {
            continue;
          }

          if(ny < 0 || ny > (NO_GRID_ROWS - 1)) {
            continue;
          }

                   
          adjList.push({adjX: nx, adjY: ny});
        }

        return adjList;
      }

      
      let adj = getNeigbours(x, y); 
      
      
      return {
        x: x,               // x coordinate
        y: y,               // y coordinate
        nodeType: 'none',   // wall node
        visited: false,     // algorithm visit
        weight: 1,          // algorithm weight
        adjList: adj,   // adjacency list for each node
        distance: Infinity, // distance w.r.t source node
        prevNode: {}
      }
    }

    const grid = [];
  
    for(let row=0; row < NO_GRID_ROWS; row++) {
      const rowElements = [];
      for(let col=0; col < NO_GRID_COLS; col++) {

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
  // ---->
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

  function visualizeBFS(e) {
    e.preventDefault();
    bfs(grid, grid[sourceNode.y][sourceNode.x], grid[destNode.y][destNode.x]);
    setNodeSelect('path');
  }

  return(
    <>
      <div className="config-bar">
        <div className="config-bar-container">
          <header>
            <h1>Algorithm Visualizer</h1>
          </header>
          <button className='run-algorithm' onClick={visualizeBFS}>Visualize Algorithm</button>
          <div className='config-bar-settings'>
            <button className='start-node-btn' onClick={handleSetStartNode}>Set Start Node</button>
            <button className='wall-nodes' onClick={handleSetWallNodes}>Set Wall Nodes</button>
            <button className='end-node-btn' onClick={handleSetDestNode}>Set End Node</button>
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
                      visited={node.visited}  
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