var TestSuite;
Require({
	defines: ["Tests/TestSuite.js"],
	onLoad: function() {
		TestSuite = function() {
		};
		
		runUnitTest = function(test, functions) {
			if (test.length == 0) {
				try {
					functions.start();
					var ret = test();
					functions.end();
					functions.done(ret);
				} catch(err) {
					functions.error(err);
				}
			} else {
				try {
					functions.start();
					test(functions);
					functions.end();
				} catch(err) {
					functions.error(err);
				}
			}
		};
		
		runPerformanceTest = function(test, functions) {
			if (test.length == 0) {
				try {
					functions.start();
					var ret = test();
					functions.end();
					functions.done(ret);
				} catch(err) {
					functions.error(err);
				}
			} else {
				try {
					test(functions);
				} catch(err) {
					functions.error(err);
				}
			}
		};
		
		runFunction = function(func, onFinishCallBack) {
			if (func) {
				if (func.length) {
					var functions = _createTestFunctions(function() {
						onFinishCallBack();
					});
					func(functions);
				} else {
					func();
					onFinishCallBack();
				}
			} else {
				onFinishCallBack();
			}
		};
		
		_createTestFunctions = function(onFinishCallBack) {
			var getTime = function() {
				if (window.performance != null && window.performance.now != null) {
					return window.performance.now();
				} else {
					return Date.now();
				}
			}
			
			var results = {};
			return {
				results: results,
				start: function() {
					results.startTime = getTime();
				},
				end: function() {
					if (results.startTime != null) {
						results.time = getTime() - results.startTime;
						delete results.startTime;
					}
				},
				error: function(error) {
					results.error = error;
					onFinishCallBack(results);
				},
				done: function(result) {
					results.result = result;
					onFinishCallBack(results);
				}
			}
		};
		
		_isTest = function(suite, testName) {
			return typeof testName === "string" && typeof suite[testName] === "function" && (testName.slice(0, 9) === "unitTest_" || testName.slice (0, 16) === "performanceTest_");
		};
		
		_getTestResult = function(suite, testName, onFinishCallBack) {
			setTimeout(function() {
				if (_isTest(suite, testName)) {					
					var callBackFunction = function(result) {
						runFunction(suite.test_AfterEachTest, function() {
							onFinishCallBack(result);
						});
					};
					
					var runTest = function() {
						var functions = _createTestFunctions(callBackFunction);
					
						if (testName.slice(0, 9) === "unitTest_") {
							functions.results.type = "Unit Test";
							functions.results.name = testName.slice(9);
							runUnitTest(suite[testName], functions);
						} else if (testName.slice (0, 16) === "performanceTest_") {
							functions.results.type = "Performance Test";
							functions.results.name = testName.slice(16);
							functions.results.past = suite["_" + testName + "_Past"];
							runPerformanceTest(suite[testName], functions);
						} else {
							callBackFunction(undefined);
						}
					};
					
					runFunction(suite.test_BeforeEachTest, function() {
						runTest();
					});
				} else {
					onFinishCallBack(undefined);
				}
			}, 0);
		};
		
		TestSuite.prototype.spy = function(func) {		
			var newClassType = function() {
				newClassType.prototype.callCount++;
				newClassType.prototype.args.push(arguments);
				var ret = func.apply(this, arguments);
				newClassType.prototype.rets.push(ret);
				return ret;
			};
			
			newClassType.prototype.callCount = 0;
			newClassType.prototype.args = [];
			newClassType.prototype.rets = [];
			
			newClassType.prototype.getCallCount = function() {
				return newClassType.prototype.callCount;
			};
			
			newClassType.prototype.getArguments = function() {
				return newClassType.prototype.args;
			};
			
			newClassType.prototype.getReturnValues = function() {
				return newClassType.prototype.rets;
			};
			
			newClassType.prototype.reset = function() {
				newClassType.prototype.callCount = 0;
				newClassType.prototype.args = [];
				newClassType.prototype.rets = [];
			};
			
			return newClassType;
		};
		
		TestSuite.prototype.getTestSuiteResults = function(suite, onFinishCallBack) {
			setTimeout(function() {
				var results = {
					results: {}
				};
				if (suite.suiteName != null) {
					results.suiteName = suite.suiteName;
				}
				
				var testCount = 0;
				for(var key in suite) {
					testCount++;
					_getTestResult(suite, key, function(result) {
						if (result) {
							results.results[key] = result;
						}
						
						// If is last test, then return result
						testCount--;
						if (testCount === 0) {
							onFinishCallBack(results);
						}
					});
				}
			}, 0);
		};
		
		TestSuite.prototype.writeTestSuiteResults = function(suite, parentHTMLElement, onFinishCallBack) {
			setTimeout(function() {
				var results = {
					results: {}
				};
				if (suite.suiteName != null) {
					results.suiteName = suite.suiteName;
				}
		
				var table = document.createElement("table");
				parentHTMLElement.appendChild(table);
				if (suite.suiteName != null) {
					var row = document.createElement("tr");
					var column = document.createElement("td");
					column.className = "suiteColumn";
					var value = document.createElement("div");
					value.className = "suite";
					value.appendChild(document.createTextNode(suite.suiteName));
					column.appendChild(value);
					row.appendChild(column);
					table.appendChild(row);
				}
				
				// Get and print results for each test in suite
				var testCount = 0;
				for(var key in suite) {
					testCount++;
					_getTestResult(suite, key, function(result) {
						if (result) {
							// Add to result array
							results.results[key] = result;

							// Print Test Type
							var row = document.createElement("tr");
							var column = document.createElement("td");
							column.appendChild(document.createTextNode(result.type));
							row.appendChild(column);
							column = document.createElement("td");
							
							// Print Test Name
							var row = document.createElement("tr");
							var column = document.createElement("td");
							column.appendChild(document.createTextNode(result.name));
							row.appendChild(column);
							column = document.createElement("td");
							
							// Print Current Results
							if (result.result !== "object") {
								var value = document.createElement("div");
								value.className = "result";
								if (result.result === undefined) {
									value.appendChild(document.createTextNode(true));
								} else {
									value.appendChild(document.createTextNode(result.result));
								}
								column.appendChild(value);
							} else {
								var error = result.result;
								var value = document.createElement("div");
								value.className = "result";
								value.appendChild(document.createTextNode(false));
								column.appendChild(value);
								
								if (error.message != null) {
									var message = document.createElement("div");
									message.className = "message";
									message.appendChild(document.createTextNode(error.message));
									column.appendChild(message);
								}
								if (error.stack != null) {
									var stackTrace = document.createElement("div");
									stackTrace.className = "stack";
									var stack = error.stack.split(/(\n|\r)+/);
									for (var key in stack) {
										var value = stack[key].trim();
										if (value.length > 0) {
											var stackLine = document.createElement("div");
											stackLine.appendChild(document.createTextNode(value));
											stackTrace.appendChild(stackLine);
										}
									}
									column.appendChild(stackTrace);
								}
							}
							row.appendChild(column);
							
							// Print Past Results
							if (result.past != null) {
								if (typeof result.past === "number") {
									column = document.createElement("td");
									var value = document.createElement("div");
									if (typeof result.result === "number" && result.result <= result.past) {
										value.className = "past good";
									} else if (typeof result.result === "number" && result.result > result.past) {
										value.className = "past bad";
									}
									value.appendChild(document.createTextNode(result.past));
									column.appendChild(value);
									row.appendChild(column);
								}
							}
							
							// End Line
							table.appendChild(row);
						}
						
						// If is last test, then return result
						testCount--;
						if (testCount === 0 && onFinishCallBack) {
							onFinishCallBack(results);
						}
					});
				}
			}, 0);
		};
	}
});
