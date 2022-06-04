
function bfs (grid, source){
    let path = [];
    var queue = [];
    let dist = 0;

    queue.push(source);
    source.visited = true;
    source.dist = dist;

    while(queue) {
        
        let v = queue.shift();
        
        path.push(v);
        
        for(let u of v.adjList) {
            
            
            if( !(grid[u.adjY][u.adjX].visited) && (grid[u.adjY][u.adjX].nodeType === 'none')) {
                grid[u.adjY][u.adjX].visited = true;
                grid[u.adjY][u.adjX].prevNode = {
                    prevX: v.x,
                    prevY: v.y
                };

                path.push(grid[u.adjY][u.adjX]);
                queue.push(grid[u.adjY][u.adjX]);
            }

            if((grid[u.adjY][u.adjX].nodeType === 'dest')) {
                grid[u.adjY][u.adjX].visited = true;
                grid[u.adjY][u.adjX].prevNode = {
                    prevX: v.x,
                    prevY: v.y
                };
                path.push(grid[u.adjY][u.adjX]);
                
                return getShortestPath(grid, source, grid[u.adjY][u.adjX]);
                
            }
        }
    }
}

const getShortestPath = (grid, source, destNode) => {
    
    let curr = destNode;
    
    let shortest = [];

    while(curr !== source) {
        
        shortest.push(curr);
        curr = grid[curr.prevNode.prevY][curr.prevNode.prevX];
        curr.nodeType = 'path';
        
    }

    source.nodeType = 'start';
    shortest.push(source);
    
    return shortest;
}



export default bfs;