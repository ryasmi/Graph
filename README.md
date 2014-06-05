# [Graph](https://www.github.com/ryansmith94/Graph)
A micro-library that provides "jQuery-like" functionality for graph structures in JavaScript.

[![Build Status](https://travis-ci.org/ryansmith94/Graph.png)](https://travis-ci.org/ryansmith94/Graph)

**License**   
This work is licensed under a [Attribution-NonCommercial-ShareAlike 4.0 International
license](https://gist.githubusercontent.com/ryansmith94/b947ee33d7bfffff9d16/raw/bcd4b00739543c4a215a1f60538d899e2c22cdfd/BY-NC-SA.txt).


**Contributing**   
Please make contributions by [forking](https://github.com/ryansmith94/Graph/fork "/fork") the project and creating a [pull-request](https://github.com/ryansmith94/Graph/pull/new/master "/pull-request"). Other contributions include maintaining the [Wiki](https://github.com/ryansmith94/Graph/wiki "/wiki") and [issues](https://github.com/ryansmith94/Graph/issues?state=open "/issues").

# Documentation
## 1 Installation
### 1.1 Browser
Reference the [raw Github version](https://raw.github.com/ryansmith94/Graph/master/build/release.min.js) of [release.min.js](https://www.github.com/ryansmith94/Graph/blob/master/build/release.min.js) in your code.

Graph is compatible with requireJS and can be used by wrapping your code in the following block:
```JavaScript
require(['graph'], function (graph) {
	// Your code.
});
```

### 1.2 Node
Graph is also available as a node package called "micro-graph". You can install it to your local repository using `npm install micro-graph --save-dev` and you can use the library with node by using `var graph = require("micro-graph").graph;` in your JavaScript file.

### 1.3 Versioning
This project is maintained under the [semantic versioning guidlines](http://semver.org/). This means that releases will have the following format `<major>.<minor>.<patch>`.
* Breaking backward compatibility bumps the major (and resets the minor and patch).
* New additions without breaking backward compatibility bumps the minor (and resets the patch).
* Bug fixes and misc changes bumps the patch.

## 2 Getting Started
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

## 3 Methods
### 3.1 children
Finds the descendants of the nodes in the graph.
```JavaScript
graph(nodes, options).children([fn, generations]);
```

**Arguments**
* {Function} fn: A function that returns true for nodes that should be returned.
* {Number} generations: The number of generations to search through (search depth).

**Returns**   
{Object} graph: A structure that can be manipulated like a graph.

### 3.2 parents
Finds the ancestors of the nodes in the graph.
```JavaScript
graph(nodes, options).parents([fn, generations]);
```

**Arguments**
* {Function} fn: A function that returns true for nodes that should be returned.
* {Number} generations: The number of generations to search through (search depth).

**Returns**   
{Object} graph: A structure that can be manipulated like a graph.

### 3.3 addChildren
Adds children to the nodes in the graph.
```JavaScript
graph(nodes, options).addChildren(children);
```

**Arguments**
* {Array} children: An array of nodes to be added as children.

**Returns**   
{Object} graph: A structure that can be manipulated like a graph.

### 3.4 addParents
Adds parents to the nodes in the graph.
```JavaScript
graph(nodes, options).addParents(parents);
```

**Arguments**
* {Array} parents: An array of nodes to be added as parents.

**Returns**   
{Object} graph: A structure that can be manipulated like a graph.

### 3.5 removeChildren
Removes children from the nodes in the graph.
```JavaScript
graph(nodes, options).removeChildren([children]);
```

**Arguments**
* {Array} children: An array of nodes to be removed as children.

**Returns**   
{Object} graph: A structure that can be manipulated like a graph.

### 3.6 removeParents
Removes parents from the nodes in the graph.
```JavaScript
graph(nodes, options).removeChildren([parents]);
```

**Arguments**
* {Array} parents: An array of nodes to be removed as parents.

**Returns**   
{Object} graph: A structure that can be manipulated like a graph.

### 3.7 filter
Filters out nodes in graph.
```JavaScript
graph(nodes, options).filter([fn]);
```

**Arguments**
* {Function} fn: A function that returns true for nodes that should be returned.

**Returns**   
{Object} graph: A structure that can be manipulated like a graph.

### 3.8 nodes
Returns the array of nodes in the graph.
```JavaScript
graph(nodes, options).nodes();
```

**Arguments**   
None.

**Returns**   
{Array} nodes: An array of nodes.
