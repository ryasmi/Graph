// # Graph
// Attaches the base class Graph to the global object (window) with the name GRAPH.
(function (window, Object, undefined) {
    "use strict";
    var parentsKey = "parents";
    var childrenKey = "children";

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
    // Generations: The number of generations to search through, if null/undefined it will search through all of them.
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

    // ## Graph
    // Provides methods for manipulating a graph of nodes.
    // @param {Array} nodes An array of nodes.
    // @param {Object} [options] An object that can be used for configuration.
    // @prop {Array} options.parentsKey The key to be used to find parents of nodes. Only needs to be set once.
    // @prop {Array} options.childrenKey The key to be used to find children of nodes. Only needs to be set once.
    // @return {Object} Returns an object with methods to manipulate the given nodes.
    var Graph = function (nodes, options) {
        var toNodes = function (nodes) {
            return (Object.prototype.toString.call(nodes) !== "[object Array]") ? [nodes] : nodes;
        };

        options = options || {};
        nodes = toNodes(nodes);
        parentsKey = options.parentsKey || parentsKey;
        childrenKey = options.childrenKey || childrenKey;

        return {
            // ### parents
            // Finds the parents of given nodes.
            // @param {Object} [filter] An object that resembles wanted nodes or a function that returns true for wanted nodes.
            // @param {Number} [generations] The depth of the search. If undefined it searches all generations.
            // @return {Array} Returns the parents of given nodes.
            "parents": function (filter, generations) {
                return get(nodes, parentsKey, filter, generations);
            },

            // ### children
            // Returns the children of given nodes.
            // @param {Object} [filter] An object that resembles wanted nodes or a function that returns true for wanted nodes.
            // @param {Number} [generations] The depth of the search. If undefined it searches all generations.
            // @return {Array} Returns the children of given nodes.
            "children": function (filter, generations) {
                return get(nodes, childrenKey, filter, generations);
            },

            // ### addParents
            // Adds parents to given nodes.
            // @param {Array} parents An array of nodes.
            // @return {Array} Returns the given nodes.
            "addParents": function (parents) {
                return add(nodes, parentsKey, add(toNodes(parents), childrenKey, nodes));
            },

            // ### addChildren
            // Adds children to given nodes.
            // @param {Array} children An array of nodes.
            // @return {Array} Returns the given nodes.
            "addChildren": function (children) {
                return add(nodes, childrenKey, add(toNodes(children), parentsKey, nodes));
            },

            // ### removeParents
            // Removes parents of given nodes.
            // @param {Array} parents An array of nodes.
            // @return {Array} Returns the given nodes.
            "removeParents": function (parents) {
                return remove(nodes, parentsKey, remove(toNodes(parents), childrenKey, nodes));
            },

            // ### removeChildren
            // Removes children of given nodes.
            // @param {Array} children An array of nodes.
            // @return {Array} Returns the given nodes.
            "removeChildren": function (children) {
                return remove(nodes, childrenKey, remove(toNodes(children), parentsKey, nodes));
            }
        };
    };

    // Add Graph to global object with the alias "GRAPH".
    window.GRAPH = Graph;
}(window, Object));