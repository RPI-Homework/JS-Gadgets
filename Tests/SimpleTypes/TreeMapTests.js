var TreeMapTests;
Require({
	defines: ["Tests/SimpleTypes/TreeMapTests.js"],
	requires: [
		"Tests/TestSuite.js",
		"SimpleTypes/TreeMap.js",
	],
	onLoad: function() {
		var Values = ["Value0", "Value1"];

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

		TreeMapTests = {
			suiteName: "TreeMapTests",
		
			unitTest_TreeMap_Creation: function() {
				var tree = new TreeMap();
				
				// Run Tests
				assertEquals(tree, tree.getRoot());
				assertEquals(undefined, tree.getParent());
				assertEquals(undefined, tree.getData());
				assertEquals(0, tree.getChildren().length);
			},
			
			unitTest_TreeMap_CreationWithIdentifier: function() {
				var tree = new TreeMap({identifier: Values[0]});
				
				// Run Tests
				assertEquals(tree, tree.getRoot());
				assertEquals(undefined, tree.getParent());
				assertEquals(Values[0], tree.getIdentifier());
				assertEquals(undefined, tree.getData());
				assertEquals(0, tree.getChildren().length);
			},
			
			unitTest_TreeMap_CreationWithData: function() {
				var tree = new TreeMap({data: Values[0]});
				
				// Run Tests
				assertEquals(tree, tree.getRoot());
				assertEquals(undefined, tree.getParent());
				assertEquals(Values[0], tree.getData());
				assertEquals(0, tree.getChildren().length);
			},
			
			unitTest_TreeMap_SetParent: function() {
				var parent = new TreeMap();
				var child = new TreeMap();
				child.setParent(parent);
				
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(1, parent.getChildren().length);
				assertEquals(child, parent.getChildren()[0]);
				
				assertEquals(parent, child.getRoot());
				assertEquals(parent, child.getParent());
				assertEquals(undefined, child.getData());
				assertEquals(0, child.getChildren().length);
			},
			
			unitTest_TreeMap_SetParentNull: function() {
				var parent = new TreeMap();
				var child = new TreeMap();
				child.setParent(parent);
				child.setParent(null);
				
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(0, parent.getChildren().length);
				
				assertEquals(child, child.getRoot());
				assertEquals(undefined, child.getParent());
				assertEquals(undefined, child.getData());
				assertEquals(0, child.getChildren().length);
			},
			
			unitTest_TreeMap_SetParentCircularDependency: function() {
				var parent = new TreeMap();
				var child = new TreeMap();
				child.setParent(parent);
				
				var fail = false;
				try {
					parent.setParent(child);
				} catch (err) {
					fail = true;
					//continue run
				}
				assertEquals(true, fail);
				
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(1, parent.getChildren().length);
				assertEquals(child, parent.getChildren()[0]);
				
				assertEquals(parent, child.getRoot());
				assertEquals(parent, child.getParent());
				assertEquals(undefined, child.getData());
				assertEquals(0, child.getChildren().length);
			},
			
			unitTest_TreeMap_SetParentInvalidParent: function() {
				var parent = new TreeMap();
				var child = new TreeMap();
				child.setParent(parent);
				
				// Non-object
				var fail = false;
				try {
					child.setParent(1);
				} catch (err) {
					fail = true;
					//continue run
				}
				assertEquals(true, fail);
				
				// Non-class object
				fail = false;
				try {
					child.setParent({});
				} catch (err) {
					fail = true;
					//continue run
				}
				assertEquals(true, fail);
				
				// Incorrect class
				fail = false;
				try {
					child.setParent({"_topLevelClass" : "NotTreeMap"}, {"_classStructure" : {"NotTreeMap" : null}});
				} catch (err) {
					fail = true;
					//continue run
				}
				assertEquals(true, fail);
				
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(1, parent.getChildren().length);
				assertEquals(child, parent.getChildren()[0]);
				
				assertEquals(parent, child.getRoot());
				assertEquals(parent, child.getParent());
				assertEquals(undefined, child.getData());
				assertEquals(0, child.getChildren().length);
			},
			
			unitTest_TreeMap_SetData: function() {
				var tree = new TreeMap({data: Values[0]});
				tree.setData(Values[1]);
				
				// Run Tests
				assertEquals(tree, tree.getRoot());
				assertEquals(undefined, tree.getParent());
				assertEquals(Values[1], tree.getData());
				assertEquals(0, tree.getChildren().length);
			},
			
			unitTest_TreeMap_AddChild: function() {
				var parent = new TreeMap();
				var child = parent.addChild();
				
				assertNotEquals(undefined, child);
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(1, parent.getChildren().length);
				assertEquals(child, parent.getChildren()[0]);
				
				assertEquals(parent, child.getRoot());
				assertEquals(parent, child.getParent());
				assertEquals(undefined, child.getData());
				assertEquals(0, child.getChildren().length);
			},
			
			unitTest_TreeMap_AddChildWithIdentifier: function() {
				var parent = new TreeMap();
				var child = parent.addChild({identifier: Values[0]});
				
				assertNotEquals(undefined, child);
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(1, parent.getChildren().length);
				assertEquals(child, parent.getChildren()[0]);
				
				assertEquals(parent, child.getRoot());
				assertEquals(parent, child.getParent());
				assertEquals(Values[0], child.getIdentifier());
				assertEquals(undefined, child.getData());
				assertEquals(0, child.getChildren().length);
			},
			
			unitTest_TreeMap_AddChildWithData: function() {
				var parent = new TreeMap();
				var child = parent.addChild({data: Values[0]});
				
				assertNotEquals(undefined, child);
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(1, parent.getChildren().length);
				assertEquals(child, parent.getChildren()[0]);
				
				assertEquals(parent, child.getRoot());
				assertEquals(parent, child.getParent());
				assertEquals(Values[0], child.getData());
				assertEquals(0, child.getChildren().length);
			},
			
			unitTest_TreeMap_AddChildTreeMap: function() {
				var parent = new TreeMap();
				var child = new TreeMap();
				parent.addChild({child: child});
				
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(1, parent.getChildren().length);
				assertEquals(child, parent.getChildren()[0]);
				
				assertEquals(parent, child.getRoot());
				assertEquals(parent, child.getParent());
				assertEquals(undefined, child.getData());
				assertEquals(0, child.getChildren().length);
			},
			
			unitTest_TreeMap_AddChildCircularDependency: function() {
				var parent = new TreeMap();
				var child = new TreeMap();
				child.setParent(parent);
				
				var fail = false;
				try {
					child.addChild({child : parent});
				} catch (err) {
					fail = true;
					//continue run
				}
				assertEquals(true, fail);
				
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(1, parent.getChildren().length);
				assertEquals(child, parent.getChildren()[0]);
				
				assertEquals(parent, child.getRoot());
				assertEquals(parent, child.getParent());
				assertEquals(undefined, child.getData());
				assertEquals(0, child.getChildren().length);
			},
			
			unitTest_TreeMap_RemoveChild: function() {
				var parent = new TreeMap();
				var child = new TreeMap();
				child.setParent(parent);
				parent.removeChild(child);
				
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(0, parent.getChildren().length);
				
				assertEquals(child, child.getRoot());
				assertEquals(undefined, child.getParent());
				assertEquals(undefined, child.getData());
				assertEquals(0, child.getChildren().length);
			},
			
			unitTest_TreeMap_RemoveChildInvalidChild: function() {
				var parent = new TreeMap();
				var child = new TreeMap();
				child.setParent(parent);
				
				// Non-object
				var fail = false;
				try {
					parent.removeChild(1);
				} catch (err) {
					fail = true;
					//continue run
				}
				assertEquals(true, fail);
				
				// Non-class object
				fail = false;
				try {
					parent.removeChild({});
				} catch (err) {
					fail = true;
					//continue run
				}
				assertEquals(true, fail);
				
				// Incorrect class
				fail = false;
				try {
					parent.removeChild({"_topLevelClass" : "NotTreeMap"}, {"_classStructure" : {"NotTreeMap" : null}});
				} catch (err) {
					fail = true;
					//continue run
				}
				assertEquals(true, fail);
				
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(1, parent.getChildren().length);
				assertEquals(child, parent.getChildren()[0]);
				
				assertEquals(parent, child.getRoot());
				assertEquals(parent, child.getParent());
				assertEquals(undefined, child.getData());
				assertEquals(0, child.getChildren().length);
			},
			
			unitTest_TreeMap_CreateDeepTreeMap: function() {
				var parent = new TreeMap();
				var child = parent.addChild();
				var subChild = child.addChild();
				
				assertNotEquals(undefined, child);
				assertNotEquals(undefined, subChild);
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(1, parent.getChildren().length);
				assertEquals(child, parent.getChildren()[0]);
				assertEquals(true, parent.hasDescendant(parent.getIdentifier()));
				assertEquals(true, parent.hasDescendant(child.getIdentifier()));
				assertEquals(true, parent.hasDescendant(subChild.getIdentifier()));
				assertEquals(parent, parent.getDescendant(parent.getIdentifier()));
				assertEquals(child, parent.getDescendant(child.getIdentifier()));
				assertEquals(subChild, parent.getDescendant(subChild.getIdentifier()));
				
				assertEquals(parent, child.getRoot());
				assertEquals(parent, child.getParent());
				assertEquals(undefined, child.getData());
				assertEquals(1, child.getChildren().length);
				assertEquals(subChild, child.getChildren()[0]);
				assertEquals(true, child.hasDescendant(child.getIdentifier()));
				assertEquals(true, child.hasDescendant(subChild.getIdentifier()));
				assertEquals(child, child.getDescendant(child.getIdentifier()));
				assertEquals(subChild, child.getDescendant(subChild.getIdentifier()));
				
				assertEquals(parent, subChild.getRoot());
				assertEquals(child, subChild.getParent());
				assertEquals(undefined, subChild.getData());
				assertEquals(0, subChild.getChildren().length);
				assertEquals(true, subChild.hasDescendant(subChild.getIdentifier()));
				assertEquals(subChild, subChild.getDescendant(subChild.getIdentifier()));
			},
			
			unitTest_TreeMap_CreateWideTreeMap: function() {
				var parent = new TreeMap();
				var child1 = parent.addChild();
				var child2 = parent.addChild();
				
				assertNotEquals(undefined, child1);
				assertNotEquals(undefined, child2);
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(2, parent.getChildren().length);
				assertEquals(child1, parent.getChildren()[0]);
				assertEquals(child2, parent.getChildren()[1]);
				assertEquals(true, parent.hasDescendant(parent.getIdentifier()));
				assertEquals(true, parent.hasDescendant(child1.getIdentifier()));
				assertEquals(true, parent.hasDescendant(child2.getIdentifier()));
				assertEquals(parent, parent.getDescendant(parent.getIdentifier()));
				assertEquals(child1, parent.getDescendant(child1.getIdentifier()));
				assertEquals(child2, parent.getDescendant(child2.getIdentifier()));
				
				assertEquals(parent, child1.getRoot());
				assertEquals(parent, child1.getParent());
				assertEquals(undefined, child1.getData());
				assertEquals(0, child1.getChildren().length);
				assertEquals(true, child1.hasDescendant(child1.getIdentifier()));
				assertEquals(child1, child1.getDescendant(child1.getIdentifier()));
				
				assertEquals(parent, child2.getRoot());
				assertEquals(parent, child2.getParent());
				assertEquals(undefined, child2.getData());
				assertEquals(0, child2.getChildren().length);
				assertEquals(true, child2.hasDescendant(child2.getIdentifier()));
				assertEquals(child2, child2.getDescendant(child2.getIdentifier()));
			},
			
			unitTest_TreeMap_ClearChildren: function() {
				var parent = new TreeMap();
				var child1 = parent.addChild();
				var child2 = parent.addChild();
				parent.clearChildren();
				
				assertNotEquals(undefined, child1);
				assertNotEquals(undefined, child2);
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(0, parent.getChildren().length);
				assertEquals(true, parent.hasDescendant(parent.getIdentifier()));
				assertEquals(false, parent.hasDescendant(child1.getIdentifier()));
				assertEquals(false, parent.hasDescendant(child2.getIdentifier()));
				assertEquals(parent, parent.getDescendant(parent.getIdentifier()));
				assertEquals(undefined, parent.getDescendant(child1.getIdentifier()));
				assertEquals(undefined, parent.getDescendant(child2.getIdentifier()));
				
				assertEquals(child1, child1.getRoot());
				assertEquals(undefined, child1.getParent());
				assertEquals(undefined, child1.getData());
				assertEquals(0, child1.getChildren().length);
				assertEquals(true, child1.hasDescendant(child1.getIdentifier()));
				assertEquals(child1, child1.getDescendant(child1.getIdentifier()));
				
				assertEquals(child2, child2.getRoot());
				assertEquals(undefined, child2.getParent());
				assertEquals(undefined, child2.getData());
				assertEquals(0, child2.getChildren().length);
				assertEquals(true, child2.hasDescendant(child2.getIdentifier()));
				assertEquals(child2, child2.getDescendant(child2.getIdentifier()));
			},
			
			unitTest_TreeMap_OrphanTreeMap: function() {
				var parent = new TreeMap();
				var child = parent.addChild();
				var subChild = child.addChild();
				child.setParent(null);
				
				assertNotEquals(undefined, child);
				assertNotEquals(undefined, subChild);
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(0, parent.getChildren().length);
				assertEquals(true, parent.hasDescendant(parent.getIdentifier()));
				assertEquals(false, parent.hasDescendant(child.getIdentifier()));
				assertEquals(false, parent.hasDescendant(subChild.getIdentifier()));
				assertEquals(parent, parent.getDescendant(parent.getIdentifier()));
				assertEquals(undefined, parent.getDescendant(child.getIdentifier()));
				assertEquals(undefined, parent.getDescendant(subChild.getIdentifier()));
				
				assertEquals(child, child.getRoot());
				assertEquals(undefined, child.getParent());
				assertEquals(undefined, child.getData());
				assertEquals(1, child.getChildren().length);
				assertEquals(subChild, child.getChildren()[0]);
				assertEquals(true, child.hasDescendant(child.getIdentifier()));
				assertEquals(true, child.hasDescendant(subChild.getIdentifier()));
				assertEquals(child, child.getDescendant(child.getIdentifier()));
				assertEquals(subChild, child.getDescendant(subChild.getIdentifier()));
				
				assertEquals(child, subChild.getRoot());
				assertEquals(child, subChild.getParent());
				assertEquals(undefined, subChild.getData());
				assertEquals(0, subChild.getChildren().length);
				assertEquals(true, subChild.hasDescendant(subChild.getIdentifier()));
				assertEquals(subChild, subChild.getDescendant(subChild.getIdentifier()));
			},
			
			unitTest_TreeMap_OrphanTreeMapWithClearChildren: function() {
				var parent = new TreeMap();
				var child = parent.addChild();
				var subChild = child.addChild();
				parent.clearChildren();
				
				assertNotEquals(undefined, child);
				assertNotEquals(undefined, subChild);
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(0, parent.getChildren().length);
				assertEquals(true, parent.hasDescendant(parent.getIdentifier()));
				assertEquals(false, parent.hasDescendant(child.getIdentifier()));
				assertEquals(false, parent.hasDescendant(subChild.getIdentifier()));
				assertEquals(parent, parent.getDescendant(parent.getIdentifier()));
				assertEquals(undefined, parent.getDescendant(child.getIdentifier()));
				assertEquals(undefined, parent.getDescendant(subChild.getIdentifier()));
				
				assertEquals(child, child.getRoot());
				assertEquals(undefined, child.getParent());
				assertEquals(undefined, child.getData());
				assertEquals(1, child.getChildren().length);
				assertEquals(subChild, child.getChildren()[0]);
				assertEquals(true, child.hasDescendant(child.getIdentifier()));
				assertEquals(true, child.hasDescendant(subChild.getIdentifier()));
				assertEquals(child, child.getDescendant(child.getIdentifier()));
				assertEquals(subChild, child.getDescendant(subChild.getIdentifier()));
				
				assertEquals(child, subChild.getRoot());
				assertEquals(child, subChild.getParent());
				assertEquals(undefined, subChild.getData());
				assertEquals(0, subChild.getChildren().length);
				assertEquals(true, subChild.hasDescendant(subChild.getIdentifier()));
				assertEquals(subChild, subChild.getDescendant(subChild.getIdentifier()));
			},
			
			unitTest_TreeMap_OrphanTreeMapWithRemoveChild: function() {
				var parent = new TreeMap();
				var child = parent.addChild();
				var subChild = child.addChild();
				parent.removeChild(child);
				
				assertNotEquals(undefined, child);
				assertNotEquals(undefined, subChild);
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(0, parent.getChildren().length);
				assertEquals(true, parent.hasDescendant(parent.getIdentifier()));
				assertEquals(false, parent.hasDescendant(child.getIdentifier()));
				assertEquals(false, parent.hasDescendant(subChild.getIdentifier()));
				assertEquals(parent, parent.getDescendant(parent.getIdentifier()));
				assertEquals(undefined, parent.getDescendant(child.getIdentifier()));
				assertEquals(undefined, parent.getDescendant(subChild.getIdentifier()));
				
				assertEquals(child, child.getRoot());
				assertEquals(undefined, child.getParent());
				assertEquals(undefined, child.getData());
				assertEquals(1, child.getChildren().length);
				assertEquals(subChild, child.getChildren()[0]);
				assertEquals(true, child.hasDescendant(child.getIdentifier()));
				assertEquals(true, child.hasDescendant(subChild.getIdentifier()));
				assertEquals(child, child.getDescendant(child.getIdentifier()));
				assertEquals(subChild, child.getDescendant(subChild.getIdentifier()));
				
				assertEquals(child, subChild.getRoot());
				assertEquals(child, subChild.getParent());
				assertEquals(undefined, subChild.getData());
				assertEquals(0, subChild.getChildren().length);
				assertEquals(true, subChild.hasDescendant(subChild.getIdentifier()));
				assertEquals(subChild, subChild.getDescendant(subChild.getIdentifier()));
			},
		}
	}
});