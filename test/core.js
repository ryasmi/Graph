/* jshint maxstatements: false, node: true */
/* global describe */
/* global it */
/* global before */
(function () {
    'use strict';
    var expect = require('chai').expect;

    describe('graph()', function () {
        var graph;
        var testConfig = {
            parentsKey: 'a',
            childrenKey: 'b'
        };

        // Tests that all graph functions are exposed.
        var testGraph = function (fn) {
            var functions = ['addChildren', 'addParents', 'removeChildren', 'removeParents', 'children', 'parents', 'filter', 'nodes'];
            var testFnExposure = function (name) {
                it('should expose a function called ' + name, function () {
                    expect(fn()[name]).to.be.a('function');
                });
            };
            
            functions.forEach(function (name) {
                testFnExposure(name);
            });
        };

        // Creates a new node.
        var createNode = function (name) {
            return {
                a: [],
                b: [],
                name: name
            };
        };

        // Prepares 2 parent and 2 child nodes.
        var prepare = function (parents, children, init) {
            parents[0] = createNode('a');
            parents[1] = createNode('b');
            children[0] = createNode('c');
            children[1] = createNode('d');
            if (init) {
                parents[0][testConfig['childrenKey']] = [children[0], children[1]];
                parents[1][testConfig['childrenKey']] = [children[0], children[1]];
                children[0][testConfig['parentsKey']] = [parents[0], parents[1]];
                children[1][testConfig['parentsKey']] = [parents[0], parents[1]];
            }
        };

        before(function () {
            graph = require('../src/core.js').graph;
            expect(graph).to.be.a('function');
        });

        testGraph(function () {
            return graph();
        });

        // Test change functions (add/remove).
        (function () {
            var testChangeFn = function (fnName, init, toStart, toUse, checkFn) {
                describe(fnName + '()', function () {
                    var myGraph;
                    var nodes = {
                        parents: [],
                        children: []
                    };

                    before(function () {
                        prepare(nodes.parents, nodes.children, init);
                        myGraph = graph(nodes[toStart], testConfig);
                        myGraph[fnName](nodes[toUse]);
                    });

                    it('should update children', function () {
                        checkFn(nodes.parents[0], nodes.children[0], 'childrenKey');
                        checkFn(nodes.parents[0], nodes.children[1], 'childrenKey');
                        checkFn(nodes.parents[1], nodes.children[0], 'childrenKey');
                        checkFn(nodes.parents[1], nodes.children[1], 'childrenKey');
                    });

                    it('should update parents', function () {
                        checkFn(nodes.children[0], nodes.parents[0], 'parentsKey');
                        checkFn(nodes.children[0], nodes.parents[1], 'parentsKey');
                        checkFn(nodes.children[1], nodes.parents[0], 'parentsKey');
                        checkFn(nodes.children[1], nodes.parents[1], 'parentsKey');
                    });

                    it('should return the current graph', function () {
                        var myGraph;
                        var nodes = {
                            parents: [],
                            children: []
                        };
                        prepare(nodes.parents, nodes.children, init);
                        myGraph = graph(nodes[toStart], testConfig);
                        expect(myGraph[fnName](nodes[toUse])).to.equal(myGraph);
                    });
                });
            };

            // Test add functions.
            (function () {
                var checkFn = function (a, b, key) {
                    expect(a[testConfig[key]].indexOf(b)).to.not.equal(-1);
                };
                testChangeFn('addChildren', false, 'parents', 'children', checkFn);
                testChangeFn('addParents', false, 'children', 'parents', checkFn);
            }());

            // Test remove functions.
            (function () {
                var checkFn = function (a, b, key) {
                    expect(a[testConfig[key]].indexOf(b)).to.equal(-1);
                };
                testChangeFn('removeChildren', true, 'parents', 'children', checkFn);
                testChangeFn('removeParents', true, 'children', 'parents', checkFn);
            }());
        }());

        // Test family functions (children/parents).
        (function () {
            var testFamilyFn = function (needle, haystack) {
                describe(needle + '()', function () {
                    var myGraph;
                    var nodes = {
                        parents: [],
                        children: []
                    };

                    before(function () {
                        prepare(nodes.parents, nodes.children, true);
                        myGraph = graph(nodes[haystack]);
                    });

                    it('should contain the correct nodes', function () {
                        var myNodes = myGraph[needle]().nodes();
                        expect(myNodes.indexOf(nodes[needle][0])).to.not.equal(-1);
                        expect(myNodes.indexOf(nodes[needle][1])).to.not.equal(-1);
                        expect(myNodes.length).to.equal(2);
                    });

                    testGraph(function () {
                        return myGraph[needle]();
                    });
                });
            };

            testFamilyFn('children', 'parents');
            testFamilyFn('parents', 'children');
        }());

        describe('filter()', function () {
            var myGraph;
            var nodes = {
                parents: [],
                children: []
            };

            before(function () {
                prepare(nodes.parents, nodes.children, true);
                myGraph = graph(nodes['parents']);
            });

            it('should contain the correct nodes', function () {
                var myNodes = myGraph.filter(function (node) {
                    if (node.name === 'b') {
                        return true;
                    }
                    return false;
                }).nodes();
                expect(myNodes.indexOf(nodes['parents'][0])).to.equal(-1);
                expect(myNodes.indexOf(nodes['parents'][1])).to.not.equal(-1);
                expect(myNodes.indexOf(nodes['children'][0])).to.equal(-1);
                expect(myNodes.indexOf(nodes['children'][1])).to.equal(-1);
                expect(myNodes.length).to.equal(1);
            });

            testGraph(function () {
                return myGraph['filter']();
            });
        });

        describe('nodes()', function () {
            var myGraph;
            var nodes = {
                parents: [],
                children: []
            };

            before(function () {
                prepare(nodes.parents, nodes.children, true);
                myGraph = graph(nodes['parents']);
            });

            it('should return the correct nodes', function () {
                var myNodes = myGraph.nodes();
                expect(myNodes.indexOf(nodes['parents'][0])).to.not.equal(-1);
                expect(myNodes.indexOf(nodes['parents'][1])).to.not.equal(-1);
                expect(myNodes.indexOf(nodes['children'][0])).to.equal(-1);
                expect(myNodes.indexOf(nodes['children'][1])).to.equal(-1);
            });
        });
    });
}());