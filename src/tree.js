/* jslint browser: true, vars: true, indent: 4 */
(function (window, Object, undefined) {
    "use strict";
    var lastParentsKey = "parents";
    var lastChildrenKey = "children";

    // Determines if one object (self) is a subset of another object (obj).
    var resembles = function (self, obj) {
        var keys = Object.keys(self);
        var len = keys.length;
        var key = 0;

        return (function check() {
            if (self[keys[key]] === obj[keys[key]]) {
                key += 1;
                return (key <= len) ? check() : true;
            }
            return false;
        }());
    };

    // Creates a relation between nodes.
    // `relatedNodes` are `relation` of `nodes`. E.g. x are children of y.
    var add = function (nodes, relation, relatedNodes) {
        nodes.forEach(function (node) {
            node[relation] = node[relation].concat(relatedNodes);
        });
        return nodes;
    };

    // Finds relations between nodes.
    // Filter: An object that "resembles" a node or a function that takes a node and returns true or false.
    // Generations: The number of generations to search through. If null/undefined it will search through all of them.
    var get = function (nodes, relation, filter, generations) {
        var filterFn;

        filter = filter || {};
        filterFn = (filter && Object.prototype.toString.call(filter) === "[object Function]") ? filter : function (child) {return resembles(filter, child); };

        return (function get(nodes, generations) {
            var filtered = [];
            var nextGen = (generations > 0 || generations === undefined) ? get : function () {return []; };

            nodes.forEach(function (node) {
                filtered = node[relation].filter(filterFn);
                filtered = filtered.concat(nextGen(node[relation], generations && generations - 1));
            });

            return filtered;
        }(nodes, generations));
    };

    // Removes a relation between nodes.
    // `relatedNodes` are not `relation` of `nodes`. E.g. x are not children of y.
    var remove = function (nodes, relation, relatedNodes) {
        nodes.forEach(function (node) {
            relatedNodes.forEach(function (relatedNode) {
                node[relation].splice(node[relation].indexOf(relatedNode), 1);
            });
        });
        return nodes;
    };

    /**
    * This is the description for my class.
    *
    * @class Tree
    */
    var Tree = function (nodes, parentsKey, childrenKey) {
        var toNodes = function (nodes) {
            return (Object.prototype.toString.call(nodes) !== "[object Array]") ? [nodes] : nodes;
        };

        nodes = toNodes(nodes);
        lastParentsKey = parentsKey || lastParentsKey;
        lastChildrenKey = childrenKey || lastChildrenKey;

        return {
            /**
            * Returns the parents of given nodes.
            * 
            * @method parents
            * @param {Object} [filter] An object that resembles wanted nodes.
            * @param {Function} [filter] A function that returns true for wanted nodes.
            * @param {Number} generations The depth of the search. If undefined it searches all generations.
            * @return {Array} Returns the parents of given nodes.
            */
            "parents": function (filter, generations) {
                return get(nodes, lastParentsKey, filter, generations);
            },
            "children": function (filter, generations) {
                return get(nodes, lastChildrenKey, filter, generations);
            },
            "addParents": function (parents) {
                return add(nodes, lastParentsKey, add(toNodes(parents), lastChildrenKey, nodes));
            },
            "addChildren": function (children) {
                return add(nodes, lastChildrenKey, add(toNodes(children), lastParentsKey, nodes));
            },
            "removeParents": function (parents) {
                return remove(nodes, lastParentsKey, remove(toNodes(parents), lastChildrenKey, nodes));
            },
            "removeChildren": function (children) {
                return remove(nodes, lastChildrenKey, remove(toNodes(children), lastParentsKey, nodes));
            }
        };
    };

    // Add tree to global object.
    window.TREE = Tree;
}(window, Object));