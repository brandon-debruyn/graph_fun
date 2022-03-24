
function breadth_first_search(grid, source) {
    var queue = [];
    let dist = 0;
    let visited = [];

    // each node has a visited (bool) 
    // each node has adjlist not accounting for walls
    
    queue.push(source);

    while(queue.length !== 0) {
        let v = queue.shift(); // return first element

        if(!v.visited) {
            dist++;
            v.distance = dist;
            visited.push(v);

            for(let u of v.adjList) {
                if( !(grid[u.adjX][u.adjY].visited) ) {
                    
                    queue.push(grid[u.adjX][u.adjY]);
                }
            }
        }
    }

    //console.log(visited);
    
}


export default breadth_first_search;