import './index.css';
import React, { useState } from 'react';

// components 
import SquareNodes from './components/SquareNodes';

// global constants
const NO_GRID_ROWS = 20;
const NO_GRID_COLS = 50;


function App() {

  // hooks
  // ----->
  const [grid, setGrid] = useState(() => {
    // individual nodes - returns each square's information as a object
    const squareNode = (x, y) => {
      return {
        x: x,               // x coordinate
        y: y,               // y coordinate
        nodeType: 'none',   // wall node
        visited: false,     // algorithm visit
        weight: 1,          // algorithm weight
        adjList: (adjList) => {

          // left and right side nodes excluding corners
          if( (x === '0' || x === ((NO_GRID_COLS - 1).toString()) ) && 
            ( y !== '0' || y !== ((NO_GRID_ROWS - 1).toString())) ) {

            // left node's neighbours
            if(x === '0') {
              return({
                adjX: ((parseInt(x) + 1).toString()),
                adjY: y
              },
              {
                adjX: x,
                adjY: ((parseInt(y) + 1).toString())
              },
              {
                adjX: x,
                adjY: ((parseInt(y) - 1).toString())
              });
            }
            // right node's neighbours ( x === NO_GRID_COLS - 1 )
            else {
              return({
                adjX: ((parseInt(x) - 1).toString()),
                adjY: y
              },
              {
                adjX: x,
                adjY: ((parseInt(y) + 1).toString())
              },
              {
                adjX: x,
                adjY: ((parseInt(y) - 1).toString())
              });
            }
          }
          // top and bottom side nodes excluding corners
          else if( (y === '0' || y === ((NO_GRID_ROWS - 1).toString()) ) && 
                 ( x !== '0' || x !== ((NO_GRID_COLS - 1).toString())) ) {
            // top node's neighbours
            if(y === '0') {
              return({
                adjX: x,
                adjY: ((parseInt(y) + 1).toString())
              },
              {
                adjX: ((parseInt(x) + 1).toString()),
                adjY: y
              },
              {
                adjX: ((parseInt(x) - 1).toString()),
                adjY: y
              });
            }
            // bottom node's neighbours ( y === NO_GRID_ROWS - 1 )
            else {
              return({
                adjX: x,
                adjY: ((parseInt(y) - 1).toString())
              },
              {
                adjX: ((parseInt(x) + 1).toString()),
                adjY: y
              },
              {
                adjX: ((parseInt(x) - 1).toString()),
                adjY: y
              });
            }
          } 
          // not top/bot or left/right side nodes or corner nodes - (each node gets 4 neighbours)
          else if( (x !== '0' || x !== ((NO_GRID_COLS - 1).toString()) ) && 
                 ( y !== '0' ||  y !== ((NO_GRID_COLS - 1).toString())) ) {
            return({
              adjX: ((parseInt(x) + 1).toString()),   // above node
              adjY: y
            },
            {
              adjX: ((parseInt(x) - 1).toString()),   // beneath node
              adjY: y
            },
            {
              adjX: x,
              adjY: ((parseInt(y) + 1).toString())    // right neighbour
            },
            {
              adjX: x,
              adjY: ((parseInt(y) - 1).toString())    // left neighbour
            });
          }
          // finnaly we have the corner nodes
          else {
            if(x === '0' && y === '0') {
              return({
                adjX: ((parseInt(x) + 1).toString()),
                adjY: y
              },
              {
                adjX: x,
                adjY: ((parseInt(y) + 1).toString())
              });
            }
            else if(x === '0' && y === ((NO_GRID_COLS - 1).toString()))          
          }
        }
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

  return(
    <>
      <div className="config-bar">
        <div className="config-bar-container">
          <header>
            <h1>Algorithm Visualizer</h1>
          </header>
          <button className='run-algorithm'>Visualize Algorithm</button>
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
