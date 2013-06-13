/* jshint maxstatements: false, node: true */
(function () {
    "use strict";

    // Setup.
    var test = require("micro-assert").assert();
    var graph = require("./release.min.js").graph;
    var x = {"a": [], "b": []};
    var y = {"a": [], "b": [], "test": 10};
    var z = {"a": [], "b": []};
    graph([], {"parentsKey": "a", "childrenKey": "b"});

    // Test method availability.
    test.equal(!!graph().addChildren, true, "Find addChildren function");
    test.equal(!!graph().addParents, true, "Find addParents function");
    test.equal(!!graph().children, true, "Find children function");
    test.equal(!!graph().parents, true, "Find parents function");
    test.equal(!!graph().removeChildren, true, "Find removeChildren function");
    test.equal(!!graph().removeParents, true, "Find removeParents function");
    test.equal(!!graph().filter, true, "Find filter function");
    test.equal(!!graph().nodes, true, "Find nodes function");

    // Test addChildren.
    graph(x).addChildren(y);
    test.equal(x.b[0], y, "Add child (y) to parent (x) with addChildren");
    test.equal(y.a[0], x, "Add parent (x) to child (y) with addChildren");

    // Test addParents.
    graph(z).addParents(y);
    test.equal(y.b[0], z, "Add child (z) to parent (y) with addParents");
    test.equal(z.a[0], y, "Add parent (y) to child (z) with addParents");

    // Test children.
    test.equal(graph(x).children().nodes()[0], y, "Get children with children");
    test.equal(graph(x).children().nodes()[1], z, "Get grand-children with children");
    test.equal(graph(x).children(function (node) {return node === y; }).nodes()[0], y, "Get children with children using a filter function.");

    // Test parents.
    test.equal(graph(z).parents().nodes()[0], y, "Get parents with parents");
    test.equal(graph(z).parents().nodes()[1], x, "Get grand-parents with parents");
    test.equal(graph(z).parents(function (node) {return node === y; }).nodes()[0], y, "Get parents with parents using a filter function");

    // Test filter.
    test.equal(graph([x, y, z]).filter().nodes()[0], x, "Return new copy of graph with filter");
    test.equal(graph([x, y, z]).filter(function (node) {return node === y; }).nodes()[0], y, "Get node with filter using a filter function");

    // Test nodes.
    test.equal(graph(x).nodes()[0], x, "Get node with nodes");
    test.equal(graph([x, y, z]).nodes()[2], z, "Get nodes with nodes");

    // Test removeChildren.
    graph(x).removeChildren(y);
    test.equal(x.b.length, 0, "Remove child (y) of parent (x) with removeChildren");
    test.equal(y.a.length, 0, "Remove parent (x) of child (y) with removeChildren");

    // Test removeParents.
    graph(z).removeParents(y);
    test.equal(y.b.length, 0, "Remove child (z) of parent (y) with removeParents");
    test.equal(z.a.length, 0, "Remove parent (y) of child (z) with removeParents");

    // Output test results.
    return test.result();
}());