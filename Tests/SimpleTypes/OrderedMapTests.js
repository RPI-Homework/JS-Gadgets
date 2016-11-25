var OrderedMapTests;
Require({
	defines: ["Tests/SimpleTypes/OrderedMapTests.js"],
	requires: [
		"Tests/TestSuite.js",
		"SimpleTypes/OrderedMap.js",
	],
	onLoad: function() {
		var Identifiers = ["ID0", "ID1", "ID2"];
		var Values = ["Value0", "Value1", "Value2"];

		function assertEquals(expected, actual) {
			if (expected !== actual) {
				throw new Error("AssertEquals: Expected <" + expected + "> Actual <" + actual + ">");
			}
		}

		function assertNotEquals(expected, actual) {
			if (expected == actual) {
				throw new Error("AssertNotEquals: Expected <" + expected + "> Actual <" + actual + ">");
			}
		}
		
		function fail(message) {
			throw new Error(message);
		}

		OrderedMapTests = {
			suiteName: "OrderedMapTests",
		
			unitTest_OrderedMap_Creation: function() {
				var orderedMap = new OrderedMap();
				
				// Run Tests
				assertEquals(false, orderedMap.hasIdentifier(null));
				assertEquals(undefined, orderedMap.getIdentifierByPosition(0));
				assertEquals(undefined, orderedMap.getValueByPosition(0));
				assertEquals(undefined, orderedMap.getValueByIdentifier(null));
				assertEquals(undefined, orderedMap.getPositionByIdentifier(null));
				assertEquals(0, orderedMap.getLength());
				assertNotEquals(null, orderedMap.getArray());
				assertEquals(0, orderedMap.getArray().length);
				assertEquals(undefined, orderedMap.removeByPosition(0));
				assertEquals(undefined, orderedMap.removeByIdentifier(null));
			},

			unitTest_OrderedMap_AddValueNullValues: function() {
				var orderedMap = new OrderedMap();
				assertEquals(0, orderedMap.addValue(null, null));
				
				// Run Tests
				assertEquals(true, orderedMap.hasIdentifier(null));
				assertEquals(null, orderedMap.getIdentifierByPosition(0));
				assertEquals(null, orderedMap.getValueByPosition(0));
				assertEquals(null, orderedMap.getValueByIdentifier(null));
				assertEquals(0, orderedMap.getPositionByIdentifier(null));
				assertEquals(1, orderedMap.getLength());
				assertNotEquals(null, orderedMap.getArray());
				assertEquals(1, orderedMap.getArray().length);
				assertNotEquals(null, orderedMap.getArray()[0]);
				assertEquals(null, orderedMap.getArray()[0].identifier);
				assertEquals(null, orderedMap.getArray()[0].value);
			},

			unitTest_OrderedMap_AddValue: function() {
				var orderedMap = new OrderedMap();
				assertEquals(0, orderedMap.addValue(Identifiers[0], Values[0]));
				
				// Run Tests
				assertEquals(true, orderedMap.hasIdentifier(Identifiers[0]));
				assertEquals(Identifiers[0], orderedMap.getIdentifierByPosition(0));
				assertEquals(Values[0], orderedMap.getValueByPosition(0));
				assertEquals(Values[0], orderedMap.getValueByIdentifier(Identifiers[0]));
				assertEquals(0, orderedMap.getPositionByIdentifier(Identifiers[0]));
				assertEquals(1, orderedMap.getLength());
				assertNotEquals(null, orderedMap.getArray());
				assertEquals(1, orderedMap.getArray().length);
				assertNotEquals(null, orderedMap.getArray()[0]);
				assertEquals(Identifiers[0], orderedMap.getArray()[0].identifier);
				assertEquals(Values[0], orderedMap.getArray()[0].value);
			},
			
			unitTest_OrderedMap_AddValueDuplicateIdentifier: function() {
				var orderedMap = new OrderedMap();
				assertEquals(0, orderedMap.addValue(Identifiers[0], Values[0]));
				try {
					orderedMap.addValue(Identifiers[0], Values[0]);
					fail("No exception was thrown");
				} catch (err) {
					//continue run
				}
				
				// Run Tests
				assertEquals(true, orderedMap.hasIdentifier(Identifiers[0]));
				assertEquals(Identifiers[0], orderedMap.getIdentifierByPosition(0));
				assertEquals(Values[0], orderedMap.getValueByPosition(0));
				assertEquals(Values[0], orderedMap.getValueByIdentifier(Identifiers[0]));
				assertEquals(0, orderedMap.getPositionByIdentifier(Identifiers[0]));
				assertEquals(1, orderedMap.getLength());
				assertNotEquals(null, orderedMap.getArray());
				assertEquals(1, orderedMap.getArray().length);
				assertNotEquals(null, orderedMap.getArray()[0]);
				assertEquals(Identifiers[0], orderedMap.getArray()[0].identifier);
				assertEquals(Values[0], orderedMap.getArray()[0].value);
			},

			unitTest_OrderedMap_AddMultipleValue: function() {
				var orderedMap = new OrderedMap();
				assertEquals(0, orderedMap.addValue(Identifiers[0], Values[0]));
				assertEquals(1, orderedMap.addValue(Identifiers[1], Values[1]));
				
				// Run Tests
				assertEquals(true, orderedMap.hasIdentifier(Identifiers[0]));
				assertEquals(true, orderedMap.hasIdentifier(Identifiers[1]));
				assertEquals(Identifiers[0], orderedMap.getIdentifierByPosition(0));
				assertEquals(Values[0], orderedMap.getValueByPosition(0));
				assertEquals(Identifiers[1], orderedMap.getIdentifierByPosition(1));
				assertEquals(Values[1], orderedMap.getValueByPosition(1));
				assertEquals(Values[0], orderedMap.getValueByIdentifier(Identifiers[0]));
				assertEquals(0, orderedMap.getPositionByIdentifier(Identifiers[0]));
				assertEquals(Values[1], orderedMap.getValueByIdentifier(Identifiers[1]));
				assertEquals(1, orderedMap.getPositionByIdentifier(Identifiers[1]));
				assertEquals(2, orderedMap.getLength());
				assertNotEquals(null, orderedMap.getArray());
				assertEquals(2, orderedMap.getArray().length);
				assertNotEquals(null, orderedMap.getArray()[0]);
				assertEquals(Identifiers[0], orderedMap.getArray()[0].identifier);
				assertEquals(Values[0], orderedMap.getArray()[0].value);
				assertNotEquals(null, orderedMap.getArray()[1]);
				assertEquals(Identifiers[1], orderedMap.getArray()[1].identifier);
				assertEquals(Values[1], orderedMap.getArray()[1].value);
			},

			unitTest_OrderedMap_AppendMultipleValue: function() {
				var orderedMap = new OrderedMap();
				assertEquals(0, orderedMap.addValue(Identifiers[1], Values[1], 0));
				assertEquals(0, orderedMap.addValue(Identifiers[0], Values[0], 0));
				
				// Run Tests
				assertEquals(true, orderedMap.hasIdentifier(Identifiers[0]));
				assertEquals(true, orderedMap.hasIdentifier(Identifiers[1]));
				assertEquals(Identifiers[0], orderedMap.getIdentifierByPosition(0));
				assertEquals(Values[0], orderedMap.getValueByPosition(0));
				assertEquals(Values[0], orderedMap.getValueByIdentifier(Identifiers[0]));
				assertEquals(0, orderedMap.getPositionByIdentifier(Identifiers[0]));
				assertEquals(Identifiers[1], orderedMap.getIdentifierByPosition(1));
				assertEquals(Values[1], orderedMap.getValueByPosition(1));
				assertEquals(Values[1], orderedMap.getValueByIdentifier(Identifiers[1]));
				assertEquals(1, orderedMap.getPositionByIdentifier(Identifiers[1]));
				assertEquals(2, orderedMap.getLength());
				assertNotEquals(null, orderedMap.getArray());
				assertEquals(2, orderedMap.getArray().length);
				assertNotEquals(null, orderedMap.getArray()[0]);
				assertEquals(Identifiers[0], orderedMap.getArray()[0].identifier);
				assertEquals(Values[0], orderedMap.getArray()[0].value);
				assertNotEquals(null, orderedMap.getArray()[1]);
				assertEquals(Identifiers[1], orderedMap.getArray()[1].identifier);
				assertEquals(Values[1], orderedMap.getArray()[1].value);
			},

			unitTest_OrderedMap_InsertMultipleValue: function() {
				var orderedMap = new OrderedMap();
				assertEquals(0, orderedMap.addValue(Identifiers[0], Values[0]));
				assertEquals(1, orderedMap.addValue(Identifiers[2], Values[2]));
				assertEquals(1, orderedMap.addValue(Identifiers[1], Values[1], 1));
				
				// Run Tests
				assertEquals(true, orderedMap.hasIdentifier(Identifiers[0]));
				assertEquals(true, orderedMap.hasIdentifier(Identifiers[1]));
				assertEquals(true, orderedMap.hasIdentifier(Identifiers[2]));
				assertEquals(Identifiers[0], orderedMap.getIdentifierByPosition(0));
				assertEquals(Values[0], orderedMap.getValueByPosition(0));
				assertEquals(Values[0], orderedMap.getValueByIdentifier(Identifiers[0]));
				assertEquals(0, orderedMap.getPositionByIdentifier(Identifiers[0]));
				assertEquals(Identifiers[1], orderedMap.getIdentifierByPosition(1));
				assertEquals(Values[1], orderedMap.getValueByPosition(1));
				assertEquals(Values[1], orderedMap.getValueByIdentifier(Identifiers[1]));
				assertEquals(1, orderedMap.getPositionByIdentifier(Identifiers[1]));
				assertEquals(Identifiers[2], orderedMap.getIdentifierByPosition(2));
				assertEquals(Values[2], orderedMap.getValueByPosition(2));
				assertEquals(Values[2], orderedMap.getValueByIdentifier(Identifiers[2]));
				assertEquals(2, orderedMap.getPositionByIdentifier(Identifiers[2]));
				assertEquals(3, orderedMap.getLength());
				assertNotEquals(null, orderedMap.getArray());
				assertEquals(3, orderedMap.getArray().length);
				assertNotEquals(null, orderedMap.getArray()[0]);
				assertEquals(Identifiers[0], orderedMap.getArray()[0].identifier);
				assertEquals(Values[0], orderedMap.getArray()[0].value);
				assertNotEquals(null, orderedMap.getArray()[1]);
				assertEquals(Identifiers[1], orderedMap.getArray()[1].identifier);
				assertEquals(Values[1], orderedMap.getArray()[1].value);
			},

			unitTest_OrderedMap_Clear: function() {
				var orderedMap = new OrderedMap();
				assertEquals(0, orderedMap.addValue(Identifiers[0], Values[0]));
				assertEquals(1, orderedMap.addValue(Identifiers[1], Values[1]));
				assertEquals(2, orderedMap.addValue(Identifiers[2], Values[2]));
				
				orderedMap.clear();
				assertEquals(false, orderedMap.hasIdentifier(Identifiers[0]));
				assertEquals(false, orderedMap.hasIdentifier(Identifiers[1]));
				assertEquals(false, orderedMap.hasIdentifier(Identifiers[2]));
				assertEquals(undefined, orderedMap.getIdentifierByPosition(0));
				assertEquals(undefined, orderedMap.getValueByPosition(0));
				assertEquals(undefined, orderedMap.getValueByIdentifier(Identifiers[0]));
				assertEquals(undefined, orderedMap.getPositionByIdentifier(Identifiers[0]));
				assertEquals(undefined, orderedMap.getIdentifierByPosition(1));
				assertEquals(undefined, orderedMap.getValueByPosition(1));
				assertEquals(undefined, orderedMap.getValueByIdentifier(Identifiers[1]));
				assertEquals(undefined, orderedMap.getPositionByIdentifier(Identifiers[1]));
				assertEquals(undefined, orderedMap.getIdentifierByPosition(2));
				assertEquals(undefined, orderedMap.getValueByPosition(3));
				assertEquals(undefined, orderedMap.getValueByIdentifier(Identifiers[2]));
				assertEquals(undefined, orderedMap.getPositionByIdentifier(Identifiers[2]));
				assertEquals(0, orderedMap.getLength());
				assertNotEquals(null, orderedMap.getArray());
				assertEquals(0, orderedMap.getArray().length);
				assertEquals(undefined, orderedMap.removeByPosition(0));
				assertEquals(undefined, orderedMap.removeByIdentifier(Identifiers[0]));
				assertEquals(undefined, orderedMap.removeByPosition(1));
				assertEquals(undefined, orderedMap.removeByIdentifier(Identifiers[1]));
				assertEquals(undefined, orderedMap.removeByPosition(2));
				assertEquals(undefined, orderedMap.removeByIdentifier(Identifiers[2]));
			},

			unitTest_OrderedMap_RemoveByPosition: function() {
				var orderedMap = new OrderedMap();
				assertEquals(0, orderedMap.addValue(Identifiers[0], Values[0]));
				assertEquals(1, orderedMap.addValue(Identifiers[1], Values[1]));
				assertEquals(2, orderedMap.addValue(Identifiers[2], Values[2]));
				
				orderedMap.removeByPosition(1);
				assertEquals(true, orderedMap.hasIdentifier(Identifiers[0]));
				assertEquals(false, orderedMap.hasIdentifier(Identifiers[1]));
				assertEquals(true, orderedMap.hasIdentifier(Identifiers[2]));
				assertEquals(Identifiers[0], orderedMap.getIdentifierByPosition(0));
				assertEquals(Values[0], orderedMap.getValueByPosition(0));
				assertEquals(Values[0], orderedMap.getValueByIdentifier(Identifiers[0]));
				assertEquals(0, orderedMap.getPositionByIdentifier(Identifiers[0]));
				assertEquals(Identifiers[2], orderedMap.getIdentifierByPosition(1));
				assertEquals(Values[2], orderedMap.getValueByPosition(1));
				assertEquals(Values[2], orderedMap.getValueByIdentifier(Identifiers[2]));
				assertEquals(1, orderedMap.getPositionByIdentifier(Identifiers[2]));
				assertEquals(2, orderedMap.getLength());
				assertNotEquals(null, orderedMap.getArray());
				assertEquals(2, orderedMap.getArray().length);
				assertNotEquals(null, orderedMap.getArray()[0]);
				assertEquals(Identifiers[0], orderedMap.getArray()[0].identifier);
				assertEquals(Values[0], orderedMap.getArray()[0].value);
				assertNotEquals(null, orderedMap.getArray()[1]);
				assertEquals(Identifiers[2], orderedMap.getArray()[1].identifier);
				assertEquals(Values[2], orderedMap.getArray()[1].value);
			},

			unitTest_OrderedMap_RemoveByIdentifier: function() {
				var orderedMap = new OrderedMap();
				assertEquals(0, orderedMap.addValue(Identifiers[0], Values[0]));
				assertEquals(1, orderedMap.addValue(Identifiers[1], Values[1]));
				assertEquals(2, orderedMap.addValue(Identifiers[2], Values[2]));
				
				orderedMap.removeByIdentifier(Identifiers[1]);
				assertEquals(true, orderedMap.hasIdentifier(Identifiers[0]));
				assertEquals(false, orderedMap.hasIdentifier(Identifiers[1]));
				assertEquals(true, orderedMap.hasIdentifier(Identifiers[2]));
				assertEquals(Identifiers[0], orderedMap.getIdentifierByPosition(0));
				assertEquals(Values[0], orderedMap.getValueByPosition(0));
				assertEquals(Values[0], orderedMap.getValueByIdentifier(Identifiers[0]));
				assertEquals(0, orderedMap.getPositionByIdentifier(Identifiers[0]));
				assertEquals(Identifiers[2], orderedMap.getIdentifierByPosition(1));
				assertEquals(Values[2], orderedMap.getValueByPosition(1));
				assertEquals(Values[2], orderedMap.getValueByIdentifier(Identifiers[2]));
				assertEquals(1, orderedMap.getPositionByIdentifier(Identifiers[2]));
				assertEquals(2, orderedMap.getLength());
				assertNotEquals(null, orderedMap.getArray());
				assertEquals(2, orderedMap.getArray().length);
				assertNotEquals(null, orderedMap.getArray()[0]);
				assertEquals(Identifiers[0], orderedMap.getArray()[0].identifier);
				assertEquals(Values[0], orderedMap.getArray()[0].value);
				assertNotEquals(null, orderedMap.getArray()[1]);
				assertEquals(Identifiers[2], orderedMap.getArray()[1].identifier);
				assertEquals(Values[2], orderedMap.getArray()[1].value);
			}
		}
	}
});