# [Graph](https://www.github.com/ryansmith94/Graph)
Provides "jQuery-like" functionality for graph structures in JavaScript.

[![Build Status](https://travis-ci.org/ryansmith94/Graph.png)](https://travis-ci.org/ryansmith94/Graph)

## License
[This work is licensed under a CC BY-NC-SA 3.0 License.](<%= http://creativecommons.org/licenses/by-nc-sa/3.0/ %>)

## Contributing
Please make contributions by [forking](https://github.com/ryansmith94/Graph/fork "/fork") the project and creating a [pull-request](https://github.com/ryansmith94/Graph/pull/new/master "/pull-request"). Other contributions include maintaining the [Wiki](https://github.com/ryansmith94/Graph/wiki "/wiki") and [issues](https://github.com/ryansmith94/Graph/issues?state=open "/issues").

# Documentation
## Installation
Reference the [raw Github version](https://raw.github.com/ryansmith94/Graph/master/build/release.min.js) of [release.min.js](https://www.github.com/ryansmith94/Graph/blob/master/build/release.min.js) in your code.

## Getting Started
To create a new graph, use the global "graph" function.
```JavaScript
graph(nodes[, options]);
```

**Arguments**
* {Array} nodes: An array of nodes.
* {Object} options: A object containing options that change the configuration of the graph.
    * {String} parentsKey: Sets the key to be used for finding parents.
    * {String} childrenKey: Sets the key to be used for finding children.

**Returns**   
{Object} graph: A structure that can be manipulated like a graph.

## Methods
### Children
Finds the descendants of the nodes in the graph.
```JavaScript
graph(nodes, options).children([fn, generations]);
```

**Arguments**
* {Function} fn: A function that returns true for nodes that should be returned.
* {Number} generations: The number of generations to search through (search depth).

**Returns**   
{Object} graph: A structure that can be manipulated like a graph.


### Parents
Finds the ancestors of the nodes in the graph.
```JavaScript
graph(nodes, options).parents([fn, generations]);
```

**Arguments**
* {Function} fn: A function that returns true for nodes that should be returned.
* {Number} generations: The number of generations to search through (search depth).

**Returns**   
{Object} graph: A structure that can be manipulated like a graph.


### addChildren
Adds children to the nodes in the graph.
```JavaScript
graph(nodes, options).addChildren(children);
```

**Arguments**
* {Array} children: An array of nodes to be added as children.

**Returns**   
{Object} graph: A structure that can be manipulated like a graph.


### addParents
Adds parents to the nodes in the graph.
```JavaScript
graph(nodes, options).addParents(parents);
```

**Arguments**
* {Array} parents: An array of nodes to be added as parents.

**Returns**   
{Object} graph: A structure that can be manipulated like a graph.


### removeChildren
Removes children from the nodes in the graph.
```JavaScript
graph(nodes, options).removeChildren([children]);
```

**Arguments**
* {Array} children: An array of nodes to be removed as children.

**Returns**   
{Object} graph: A structure that can be manipulated like a graph.


### removeParents
Removes parents from the nodes in the graph.
```JavaScript
graph(nodes, options).removeChildren([parents]);
```

**Arguments**
* {Array} parents: An array of nodes to be removed as parents.

**Returns**   
{Object} graph: A structure that can be manipulated like a graph.


### filter
Filters out nodes in graph.
```JavaScript
graph(nodes, options).filter([fn]);
```

**Arguments**
* {Function} fn: A function that returns true for nodes that should be returned.

**Returns**   
{Object} graph: A structure that can be manipulated like a graph.


### nodes
Returns the array of nodes in the graph.
```JavaScript
graph(nodes, options).nodes();
```

**Arguments**
None.

**Returns**   
{Array} nodes: An array of nodes.