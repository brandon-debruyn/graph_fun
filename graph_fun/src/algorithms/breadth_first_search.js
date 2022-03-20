import React from 'react'



function breadth_first_search(grid, source, no_vertices) {
    var queue = []; // use queue.shift() -> returns first ele
    id = 0;
    visited = new Array.fill(0, 0, no_vertices);
    
    queue.push(source);

    while(queue.length !== 0) {
        let v = queue.shift();

        if(!visited[v]) {
            visited[v] = ++id;

            for(let u of adjacency_list[v]) {
                if(!visited[u]) {
                    queue.push(u);
                }
            }
        }
    }
    
}


export default breadth_first_search;