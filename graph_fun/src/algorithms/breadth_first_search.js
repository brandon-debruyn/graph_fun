
function breadth_first_search(grid, source, dest) {

    let distance = 0;
    let path = [];
    let destFound = false;
    source.dist = distance;
    source.prevNode = null;

    console.log(source);
    
    var queue = [];
    queue.push(source);

    while(queue.length !== 0) {
        let v = queue.shift();

        for(let u of v.adjList) {
            
            if( !(grid[u.adjY][u.adjX].visited) && (grid[u.adjY][u.adjX].nodeType !== 'wall' )) {

                grid[u.adjY][u.adjX].visited = true;
                grid[u.adjY][u.adjX].dist = ++distance;
                grid[u.adjY][u.adjX].prevNode = {
                    prevX: v.x,
                    prevY: v.y
                };

                path.push(grid[u.adjY][u.adjX].prevNode);

                if(grid[u.adjY][u.adjX] === dest) {
                    destFound = true;
                    break;
                }

                queue.push(grid[u.adjY][u.adjX])
            }
        }

        if(destFound) {
            break;
        }
    }
    
    console.log(path);

    /*
    var queue = [];
    let dist = 0;
    let visited = [];

    // each node has a visited (bool) 
    // each node has adjlist not accounting for walls
    
    queue.push(source);

    while(queue.length !== 0) {
        let v = queue.shift(); // return first element

        if(!v.visited && v !== dest) {
            dist++;
            v.distance = dist;
            v.visited = true;
            visited.push(v);

            for(let u of v.adjList) {
                console.log(u.adjX + " " + u.adjY);
                if( grid[u.adjY][u.adjX].visited === false ) {
                    queue.push(grid[u.adjY][u.adjX]);
                }
            }
        }
        else if(v === dest) {
            break;
        }
    }
    */

}


export default breadth_first_search;