import { React, useEffect, useState } from 'react'

function SquareNodes(props) {

    const[isVisited, setIsVisited] = useState(props.visited);

    useEffect(() => {

    }, [isVisited]);

    function setNode() {
        
        props.setGrid(prevGrid => {
            const newGrid = [...prevGrid];

            // set node type based on config panel selection
            if(props.nodeSelect === 'start') {
                newGrid[props.y][props.x].nodeType = 'start';
                props.setSourceNode(prevSourceNode => ({
                    ...prevSourceNode,
                    x: props.x,
                    y: props.y
                    
                }));
            }
            
            if(props.nodeSelect === 'dest') {
                newGrid[props.y][props.x].nodeType = 'dest';
                props.setDestNode(prevDestNode => ({
                    ...prevDestNode, 
                    x: props.x,
                    y: props.y
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
            className={`squareNode ${props.nodeType}-node visited-${props.visited ? 'true' : 'false'}`} 
            id={`${props.x} - ${props.y}`}
            onClick={() => {setNode()}}
        ></div>
    );
}



export default SquareNodes;
