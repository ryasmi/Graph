(function (scope) {
    'use strict';
    var config = {
        parentsKey: 'parents',
        childrenKey: 'children'
    };

    var add = function (nodes, relation, relatedNodes) {
        nodes.forEach(function (node) {
            node[relation] = node[relation].concat(relatedNodes);
        });
        return nodes;
    };

    var get = function (nodes, relation, fn, generations) {
        return (function get(nodes, generations) {
            var filtered = [];
            var nextGen = (generations > 0 || generations === undefined) ? get : function () {return []; };

            nodes.forEach(function (node) {
                filtered = node[relation].filter(fn);
                filtered = filtered.concat(nextGen(node[relation], generations && generations - 1));
            });

            return filtered;
        }(nodes, generations));
    };

    var remove = function (nodes, relation, relatedNodes) {
        nodes.forEach(function (node) {
            relatedNodes.forEach(function (relatedNode) {
                node[relation].splice(node[relation].indexOf(relatedNode), 1);
            });
        });
        return nodes;
    };

    var toNodes = function (nodes) {
        return (Object.prototype.toString.call(nodes) !== '[object Array]') ? [nodes] : nodes;
    };

    var trueFn = function () {
        return true;
    };

    var Graph = function (nodes, options) {
        var self = this;

        nodes = toNodes(nodes);
        options = options || config;
        config = options;

        self.children = function (fn, generations) {
            return new Graph(get(nodes, options.childrenKey, fn || trueFn, generations), options);
        };
        self.parents = function (fn, generations) {
            return new Graph(get(nodes, options.parentsKey, fn || trueFn, generations), options);
        };
        self.addChildren = function (children) {
            add(nodes, options.childrenKey, add(toNodes(children), options.parentsKey, nodes));
            return self;
        };
        self.addParents = function (parents) {
            add(nodes, options.parentsKey, add(toNodes(parents), options.childrenKey, nodes));
            return self;
        };
        self.removeChildren = function (children) {
            remove(nodes, options.childrenKey, remove(toNodes(children), options.parentsKey, nodes));
            return self;
        };
        self.removeParents = function (parents) {
            remove(nodes, options.parentsKey, remove(toNodes(parents), options.childrenKey, nodes));
            return self;
        };
        self.filter = function (fn) {
            return new Graph(nodes.filter(fn || trueFn), options);
        };
        self.nodes = function () {
            return nodes;
        };

        return self;
    };

    scope.graph = function (nodes, options) {
        return new Graph(nodes, options);
    };
}(this));