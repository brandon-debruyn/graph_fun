import './index.css';
import React, { useState } from 'react';

// components 
import SquareNodes from './components/SquareNodes';
import breadth_first_search from './algorithms/breadth_first_search';

// global constants
const NO_GRID_ROWS = 20;
const NO_GRID_COLS = 50;


function App() {

  // hooks
  // ----->
  const [grid, setGrid] = useState(() => {
    // individual nodes - returns each square's information as a object
    const squareNode = (x, y) => {

      /* more efficient fix for getNeigbours required ---> tbd */
      const getNeigbours = (x, y) => {

        // corner nodes
        if(x === 0 && y === 0) {
          return([{
            adjX: x + 1,
            adjY: y
          },
          {
            adjX: x,
            adjY: y + 1
          }]);
        } 
        else if(x === 0 && y === (NO_GRID_ROWS - 1)) {
          return([{
            adjX: x + 1,
            adjY: y
          },
          {
            adjX: x,
            adjY: y - 1
          }]);
        }  
        else if(x === (NO_GRID_COLS - 1) && y === 0) {
          return([{
            adjX: x - 1,
            adjY: y
          },
          {
            adjX: x,
            adjY: y + 1
          }]);
        }
        else if(x === (NO_GRID_COLS - 1) && y === (NO_GRID_ROWS - 1)) {
          return([{
            adjX: x - 1,
            adjY: y
          },
          {
            adjX: x,
            adjY: y - 1
          }]);
        }
        // left and right side nodes excluding corners
        if( (x === 0 || x === (NO_GRID_COLS - 1) ) && 
          ( y !== 0 || y !== (NO_GRID_ROWS - 1)) ) {

          // left node's neighbours
          if(x === 0) {
            return([{
              adjX: x + 1,
              adjY: y
            },
            {
              adjX: x,
              adjY: y + 1
            },
            {
              adjX: x,
              adjY: y - 1
            }]);
          }
          // right node's neighbours ( x === NO_GRID_COLS - 1 )
          else {
            return([{
              adjX: x - 1,
              adjY: y
            },
            {
              adjX: x,
              adjY: y + 1
            },
            {
              adjX: x,
              adjY: y - 1
            }]);
          }
        }
        // top and bottom side nodes excluding corners
        else if( (y === 0 || y === (NO_GRID_ROWS - 1) ) && 
                ( x !== 0 || x !== (NO_GRID_COLS - 1)) ) {
          // top node's neighbours
          if(y === 0) {
            return([{
              adjX: x,
              adjY: y + 1
            },
            {
              adjX: x + 1,
              adjY: y
            },
            {
              adjX: x - 1,
              adjY: y
            }]);
          }
          // bottom node's neighbours ( y === NO_GRID_ROWS - 1 )
          else {
            return([{
              adjX: x,
              adjY: y - 1
            },
            {
              adjX: x + 1,
              adjY: y
            },
            {
              adjX: x - 1,
              adjY: y
            }]);
          }
        } 
        // not top/bot or left/right side nodes or corner nodes - (each node gets 4 neighbours)
        else {
          return([{
            adjX: x + 1,   // above node
            adjY: y
          },
          {
            adjX: x - 1,   // beneath node
            adjY: y
          },
          {
            adjX: x,
            adjY: y + 1    // right neighbour
          },
          {
            adjX: x,
            adjY: y - 1    // left neighbour
          }]);
        }
      }

      let adjList = getNeigbours(x, y);

      return {
        x: x,               // x coordinate
        y: y,               // y coordinate
        nodeType: 'none',   // wall node
        visited: false,     // algorithm visit
        weight: 1,          // algorithm weight
        adjList: adjList,   // adjacency list for each node
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
    breadth_first_search(grid, grid[sourceNode.y][sourceNode.x], grid[destNode.y][destNode.x]);
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