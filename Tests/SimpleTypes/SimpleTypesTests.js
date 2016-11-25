Require({
	defines: ["Tests/SimpleTypes/SimpleTypesTests.js"],
	requires: [
		"Tests/TestSuite.js",
		"Tests/SimpleTypes/OrderedMapTests.js",
		"Tests/SimpleTypes/OrderedMapPerformanceTests.js",
		"Tests/SimpleTypes/TreeTests.js",
		"Tests/SimpleTypes/TreeMapTests.js"
	],
	onLoad: function() {
		TestSuite.prototype.writeTestSuiteResults(OrderedMapTests, document.body);
		TestSuite.prototype.writeTestSuiteResults(OrderedMapPerformanceTests, document.body);
		TestSuite.prototype.writeTestSuiteResults(TreeTests, document.body);
		TestSuite.prototype.writeTestSuiteResults(TreeMapTests, document.body);
	}
});