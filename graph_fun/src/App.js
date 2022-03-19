import './index.css';
import React from 'react';

// components 
import SquareNodes from './components/SquareNodes';


// initial grid to be generated
const generateGrid = () => {
  
  const grid = [];
  
  for(let row=0; row < 25; row++) {
    for(let col=0; col < 27; col++) {
      // add node to current row -- (col, row) -> corresponds with x-axis (cols) / y-axis (rows) 
      let key = col.toString() + row.toString()
      grid.push(squareNodes(col, row, key));     

    }
  }

  return grid;
  
}

// individual nodes - returns each square's information as a object
const squareNodes = (x, y, key) => {
  return {
    key: key, 
    x: x,        // x coordinate
    y: y,        // y coordinate
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [],
    }

  }
  
  // lifecycle methods
  componentDidMount() {
    const grid = generateGrid();

    this.setState({grid});
  }

  render() {
    return(
      <div className="graph">
        <div className="grid-container">
          {this.state.grid.map( (node) => {
            return(
              <SquareNodes
                x={node.x}
                y={node.y}
                key={node.key}
              />
            );
          })}
        </div>
      </div>
    );
  }
}


export default App;
