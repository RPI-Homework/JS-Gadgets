var OrderedMapPerformanceTests;
Require({
	defines: ["Tests/SimpleTypes/OrderedMapPerformanceTests.js"],
	requires: [
		"Tests/TestSuite.js",
		"SimpleTypes/OrderedMap.js",
	],
	onLoad: function() {
		function getTime() {
			if (window.performance != null && window.performance.now != null) {
				return window.performance.now();
			} else {
				return Date.now();
			}
		}

		OrderedMapPerformanceTests = {
			suiteName: "OrderedMapPerformanceTests",
			
			_performanceTest_OrderedMap_CreationPerformance_Past: 0.00030,
			
			performanceTest_OrderedMap_CreationPerformance: function() {
				var startTime = getTime();
				for(var i = 0; i < 1000; i++) {
					var orderedMap = new OrderedMap();
				}
				return (getTime() - startTime) / 1000;
			},
			
			_performanceTest_OrderedMap_AddValuePerformance_Past: 0.00025,
			
			performanceTest_OrderedMap_AddValuePerformance: function() {
				var orderedMap = new OrderedMap();
				var startTime = getTime();
				for(var i = 0; i < 1000; i++) {
					orderedMap.addValue(i, null);
				}
				return (getTime() - startTime) / 1000;
			},
			
			_performanceTest_OrderedMap_AppendValuePerformance_Past: 0.00090,
			
			performanceTest_OrderedMap_AppendValuePerformance: function() {
				var orderedMap = new OrderedMap();
				var startTime = getTime();
				for(var i = 0; i < 1000; i++) {
					orderedMap.addValue(i, null, 0);
				}
				return (getTime() - startTime) / 1000;
			},
			
			_performanceTest_OrderedMap_InsertValuePerformance_Past: 0.00080,
			
			performanceTest_OrderedMap_InsertValuePerformance: function() {
				var orderedMap = new OrderedMap();
				var startTime = getTime();
				for(var i = 0; i < 1000; i++) {
					orderedMap.addValue(i, null, i - 1);
				}
				return (getTime() - startTime) / 1000;
			},
			
			_performanceTest_OrderedMap_ReorderMapPerformance_Past: 0.00025,
			
			performanceTest_OrderedMap_ReorderMapPerformance: function() {
				var orderedMap = new OrderedMap();
				for(var i = 0; i < 1000; i++) {
					orderedMap.addValue(i, null, 0);
				}
				orderedMap._fInvalidPosition = 0;
				
				var startTime = getTime();
				orderedMap._reorderMap();
				return (getTime() - startTime) / 1000;
			},
			
			_performanceTest_OrderedMap_ClearMapPerformance_Past: 0.000020,
			
			performanceTest_OrderedMap_ClearMapPerformance: function() {
				var orderedMap = new OrderedMap();
				for(var i = 0; i < 1000; i++) {
					orderedMap.addValue(i, null);
				}
				
				var startTime = getTime();
				orderedMap.clear();
				return (getTime() - startTime) / 1000;
			},
			
			_performanceTest_OrderedMap_GetIdentifierByPositionPerformance_Past: 0.00010,
			
			performanceTest_OrderedMap_GetIdentifierByPositionPerformance: function() {
				var orderedMap = new OrderedMap();
				for(var i = 0; i < 1000; i++) {
					orderedMap.addValue(i, null);
				}
				
				var startTime = getTime();
				for(var i = 0; i < 1000; i++) {
					orderedMap.getIdentifierByPosition(i);
				}
				return (getTime() - startTime) / 1000;
			},
			
			_performanceTest_OrderedMap_GetValueByPositionPerformance_Past: 0.00010,
			
			performanceTest_OrderedMap_GetValueByPositionPerformance: function() {
				var orderedMap = new OrderedMap();
				for(var i = 0; i < 1000; i++) {
					orderedMap.addValue(i, null);
				}
				
				var startTime = getTime();
				for(var i = 0; i < 1000; i++) {
					orderedMap.getValueByPosition(i);
				}
				return (getTime() - startTime) / 1000;
			},
			
			_performanceTest_OrderedMap_GetValueByIdentifierPerformance_Past: 0.000050,
			
			performanceTest_OrderedMap_GetValueByIdentifierPerformance: function() {
				var orderedMap = new OrderedMap();
				for(var i = 0; i < 1000; i++) {
					orderedMap.addValue(i, null);
				}
				
				var startTime = getTime();
				for(var i = 0; i < 1000; i++) {
					orderedMap.getValueByIdentifier(i);
				}
				return (getTime() - startTime) / 1000;
			},
			
			_performanceTest_OrderedMap_GetPositionByIdentifierPerformance_Past: 0.00070,
			
			performanceTest_OrderedMap_GetPositionByIdentifierPerformance: function() {
				var orderedMap = new OrderedMap();
				for(var i = 0; i < 1000; i++) {
					orderedMap.addValue(i, null);
				}
				
				var startTime = getTime();
				for(var i = 0; i < 1000; i++) {
					orderedMap.getPositionByIdentifier(i);
				}
				return (getTime() - startTime) / 1000;
			},
			
			_performanceTest_OrderedMap_RemoveByPositionPerformance_Past: 0.00090,
			
			performanceTest_OrderedMap_RemoveByPositionPerformance: function() {
				var orderedMap = new OrderedMap();
				for(var i = 0; i < 1000; i++) {
					orderedMap.addValue(i, null);
				}
				
				var startTime = getTime();
				for(var i = 0; i < 1000; i++) {
					orderedMap.removeByPosition(i);
				}
				return (getTime() - startTime) / 1000;
			},
			
			_performanceTest_OrderedMap_RemoveByIdentifierPerformance_Past: 0.00050,
			
			performanceTest_OrderedMap_RemoveByIdentifierPerformance: function() {
				var orderedMap = new OrderedMap();
				for(var i = 0; i < 1000; i++) {
					orderedMap.addValue(i, null);
				}
				
				var startTime = getTime();
				for(var i = 1000; i >= 0; i--) {
					orderedMap.removeByIdentifier(i);
				}
				return (getTime() - startTime) / 1000;
			},
			
			_performanceTest_OrderedMap_RemoveByIdentifierForceReorderPerformance_Past: 0.070,
			
			performanceTest_OrderedMap_RemoveByIdentifierForceReorderPerformance: function() {
				var orderedMap = new OrderedMap();
				for(var i = 0; i < 1000; i++) {
					orderedMap.addValue(i, null);
				}
				
				var startTime = getTime();
				for(var i = 0; i < 1000; i++) {
					orderedMap.removeByIdentifier(i);
				}
				return (getTime() - startTime) / 1000;
			}
		}
	}
});