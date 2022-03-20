import React from 'react'

function SquareNodes(props) {

    function setNode() {
        
        props.setGrid(prevGrid => {
            const newGrid = [...prevGrid];

            // set node type based on config selection
            if(props.nodeSelect === 'start') {
                newGrid[props.y][props.x].nodeType = 'start';
                props.setSourceNode(prevSourceNode => ({
                    ...prevSourceNode, 
                    x: {
                        ...prevSourceNode.x,
                        x: props.x
                    },
                    y: {
                        ...prevSourceNode.y,
                        y: props.y
                    }
                }));
            }
            
            if(props.nodeSelect === 'dest') {
                newGrid[props.y][props.x].nodeType = 'dest';
                props.setDestNode(prevDestNode => ({
                    ...prevDestNode, 
                    x: {
                        ...prevDestNode.x,
                        x: props.x
                    },
                    y: {
                        ...prevDestNode.y,
                        y: props.y
                    }
                }));
            }
            
            if(props.nodeSelect === 'wall') {
                newGrid[props.y][props.x].nodeType = 'wall';

            }

            return newGrid;
        })
    }

    return(
        <div 
            className="squareNode"
            id={props.x + "-" + props.y}
            onClick={() => {setNode()}}
        ></div>
    );
}



export default SquareNodes;
