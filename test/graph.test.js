/* jshint devel: true, maxstatements: false */
(function (window, undefined) {
    "use strict";
    // Local copy of graph.
    var GRAPH = window.GRAPH;

    // Provides testing functionality.
    var assert = (function () {
        var tests = 0;
        var failed = 0;
        var logSuccess = false;

        return {
            "equal" : function (val1, val2, msg) {
                tests += 1;

                if (val1 !== val2) {
                    failed += 1;
                    console.warn("Test " + tests + " failed." + (msg ? " " + msg + " was not successful." : ""));
                } else if (logSuccess) {
                    console.log("Test " + tests + " passed." + (msg ? " " + msg + " was succesful." : ""));
                }
            },
            "passed": function () {
                return tests - failed;
            },
            "failed": function () {
                return failed;
            },
            "tests": function () {
                return tests;
            },
            "toString": function () {
                return (tests - failed) + "/" + tests + " tests were passed.";
            },
            "result": function () {
                console[(failed === 0) ? "log" : "warn"]((tests - failed) + "/" + tests + " tests were passed.");
                return failed === 0;
            },
            "logSuccess": logSuccess
        };
    }());

    // Determines if two arrays (arr1 and arr2) contain the same elements.
    var arraysEqual = function (arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }

        arr1.forEach(function (elem, index) {
            if (elem !== arr2[index]) {
                return false;
            }
        });

        return true;
    };

    // Determines if an empty object is a subset of another object (obj).
    var resembles = function (obj) {
        var self = {};
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

    // Setup.
    var w = {"a": [], "b": []};
    var x = {"a": [], "b": []};
    var y = {"a": [], "b": [], "test": 10};
    var z = {"a": [], "b": []};
    GRAPH([], {"parentsKey": "a", "childrenKey": "b"});

    // Test method availability.
    assert.equal(!!GRAPH().addChildren, true, "Find addChildren function");
    assert.equal(!!GRAPH().addParents, true, "Find addParents function");
    assert.equal(!!GRAPH().children, true, "Find children function");
    assert.equal(!!GRAPH().parents, true, "Find parents function");
    assert.equal(!!GRAPH().removeChildren, true, "Find removeChildren function");
    assert.equal(!!GRAPH().removeParents, true, "Find removeParents function");

    // Test addChildren.
    GRAPH(x).addChildren(y);
    assert.equal(x.b[0], y, "Add child (y) to parent (x) with addChildren");
    assert.equal(y.a[0], x, "Add parent (x) to child (y) with addChildren");

    // Test addParents.
    GRAPH(z).addParents(y);
    assert.equal(y.b[0], z, "Add child (z) to parent (y) with addParents");
    assert.equal(z.a[0], y, "Add parent (y) to child (z) with addParents");

    // Test children.
    assert.equal(arraysEqual(GRAPH(x).children(), GRAPH(x).children(undefined, 1)), true);
    assert.equal(arraysEqual(GRAPH(x).children(undefined, 0), [y]), true);
    assert.equal(arraysEqual(GRAPH(x).children({"test": 10}), [y]), true);
    assert.equal(arraysEqual(GRAPH(x).children(resembles), [y, z]), true);

    // Test parents.
    assert.equal(arraysEqual(GRAPH(z).parents(), GRAPH(z).parents(undefined, 1)), true);
    assert.equal(arraysEqual(GRAPH(z).parents(undefined, 0), [y]), true);
    assert.equal(arraysEqual(GRAPH(z).parents({"test": 10}), [y]), true);
    assert.equal(arraysEqual(GRAPH(z).parents(resembles), [y, x]), true);

    // Test removeChildren.
    GRAPH(x).addChildren(w);
    GRAPH(x).removeChildren(y);
    assert.equal(x.b[0], w, "Remove child (y) of parent (x) with removeChildren");
    assert.equal(y.a.length, 0, "Remove parent (x) of child (y) with removeChildren");

    // Test removeParents.
    GRAPH(z).addParents(w);
    GRAPH(z).removeParents(y);
    assert.equal(y.b.length, 0, "Remove child (z) of parent (y) with removeParents");
    assert.equal(z.a[0], w, "Remove parent (y) of child (z) with removeParents");

    // Output test results.
    return assert.result();
}(window));