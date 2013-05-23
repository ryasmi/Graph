**[Tree](https://www.github.com/ryansmith94/Tree)**   
Provides "jQuery-like" functionality for tree structures. Note that at this time Tree does not prevent cycles. Tree does allow nodes to have many parents and children.

![Travis-CI](https://api.travis-ci.org/ryansmith94/Tree.png?branch=master)     

**Authors**   
[Ryan Smith](https://www.github.com/ryansmith94)

**Contributing**   
Please make contributions by [forking](https://github.com/ryansmith94/Tree/fork "/fork") the project and creating a [pull-request](https://github.com/ryansmith94/Tree/pull/new/master "/pull-request"). Other contributions include maintaining the [Wiki](https://github.com/ryansmith94/Tree/wiki "/wiki") and [issues](https://github.com/ryansmith94/Tree/issues?state=open "/issues").

**License**   
[This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.](http://creativecommons.org/licenses/by-nc-sa/3.0/)

**Library**   
**1 Installation**   
You will need the file [build/tree.min.js](https://github.com/ryansmith94/Tree/blob/master/build/tree.min.js). You can either copy and paste this file into your project or reference the [raw version](https://raw.github.com/ryansmith94/Tree/master/build/tree.min.js) of the file on github.

**2 Getting Stated**   
**2.1 Define your own keys**   
```JavaScript
TREE([], "myParentsKey", "myChildrenKey");
```
If you do not define your own keys it will default to `parents` and `children`. Once you have defined your own keys you do not have to define them again, this means that you can call `TREE` and it will default to your defined keys from an earlier call. In the case above the defined keys are `myParentsKey` and `myChildrenKey`.

**2.2 Tree**   
```JavaScript
TREE(nodes, parentsKey, childrenKey)
```
nodes: An array of objects (nodes) or a single object (node).
parentsKey: A string to be used as the key for parents in an object (node).
childrenKey: A string to be used as the key for children in an object (node).

**2.3 Add Children/Parents**   
```JavaScript
TREE(nodes).addChildren(children);
TREE(nodes).addParents(parents);
```
children/parents: An array of objects (nodes) or a single object (node) to be added as the children/parents of all tree nodes.

**2.4 Get Children/Parents**   
```JavaScript
TREE(nodes).children([filter, generations]);
TREE(nodes).parents([filter, generations]);
```
filter: An object that resembles wanted nodes or a function that returns true for wanted nodes.
generations: The depth of the search or number of generations to search through. If this is null/undefined then it will search all generations.

**2.5 Remove Children/Parents**   
```JavaScript
TREE(nodes).removeChildren(children);
TREE(nodes).removeParents(parents);
```
children/parents: An array of objects (nodes) or a single object (node) to be removed from the children/parents of all tree nodes.