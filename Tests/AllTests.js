(function() {
	Require({
		defines: ["Tests/AllTests.js"],
		requires: [
			"Tests/TestSuite.js",
			"SimpleTypes/OrderedMap.js",
			"Tests/SimpleTypes/OrderedMapTests.js",
			"Tests/SimpleTypes/OrderedMapPerformanceTests.js",
			"SimpleTypes/Tree.js",
			"Tests/SimpleTypes/TreeTests.js",
			"SimpleTypes/TreeMap.js",
			"Tests/SimpleTypes/TreeMapTests.js"
		],
		onLoad: function() {
			TestSuite.prototype.writeTestSuiteResults(OrderedMapTests, document.body);
			TestSuite.prototype.writeTestSuiteResults(OrderedMapPerformanceTests, document.body);
			TestSuite.prototype.writeTestSuiteResults(TreeTests, document.body);
			TestSuite.prototype.writeTestSuiteResults(TreeMapTests, document.body);
		}
	});
}());