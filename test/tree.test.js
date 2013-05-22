/* jshint devel: true, maxstatements: false */
(function (window, undefined) {
    "use strict";
    // Local copy of tree.
    var TREE = window.TREE;

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
    TREE([], "a", "b");

    // Test method availability.
    assert.equal(!!TREE().addChildren, true, "Find addChildren function");
    assert.equal(!!TREE().addParents, true, "Find addParents function");
    assert.equal(!!TREE().children, true, "Find children function");
    assert.equal(!!TREE().parents, true, "Find parents function");
    assert.equal(!!TREE().removeChildren, true, "Find removeChildren function");
    assert.equal(!!TREE().removeParents, true, "Find removeParents function");

    // Test addChildren.
    TREE(x).addChildren(y);
    assert.equal(x.b[0], y, "Add child (y) to parent (x) with addChildren");
    assert.equal(y.a[0], x, "Add parent (x) to child (y) with addChildren");

    // Test addParents.
    TREE(z).addParents(y);
    assert.equal(y.b[0], z, "Add child (z) to parent (y) with addParents");
    assert.equal(z.a[0], y, "Add parent (y) to child (z) with addParents");

    // Test children.
    assert.equal(arraysEqual(TREE(x).children(), TREE(x).children(undefined, 1)), true);
    assert.equal(arraysEqual(TREE(x).children(undefined, 0), [y]), true);
    assert.equal(arraysEqual(TREE(x).children({"test": 10}), [y]), true);
    assert.equal(arraysEqual(TREE(x).children(resembles), [y, z]), true);

    // Test parents.
    assert.equal(arraysEqual(TREE(z).parents(), TREE(z).parents(undefined, 1)), true);
    assert.equal(arraysEqual(TREE(z).parents(undefined, 0), [y]), true);
    assert.equal(arraysEqual(TREE(z).parents({"test": 10}), [y]), true);
    assert.equal(arraysEqual(TREE(z).parents(resembles), [y, x]), true);

    // Test removeChildren.
    TREE(x).addChildren(w);
    TREE(x).removeChildren(y);
    assert.equal(x.b[0], w, "Remove child (y) of parent (x) with removeChildren");
    assert.equal(y.a.length, 0, "Remove parent (x) of child (y) with removeChildren");

    // Test removeParents.
    TREE(z).addParents(w);
    TREE(z).removeParents(y);
    assert.equal(y.b.length, 0, "Remove child (z) of parent (y) with removeParents");
    assert.equal(z.a[0], w, "Remove parent (y) of child (z) with removeParents");

    // Output test results.
    return assert.result();
}(window));