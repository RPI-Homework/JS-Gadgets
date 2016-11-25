var TreeTests;
Require({
	defines: ["Tests/SimpleTypes/TreeTests.js"],
	requires: [
		"Tests/TestSuite.js",
		"SimpleTypes/Tree.js",
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

		TreeTests = {
			suiteName: "TreeTests",

			unitTest_Tree_Creation: function() {
				var tree = new Tree();
				
				// Run Tests
				assertEquals(tree, tree.getRoot());
				assertEquals(undefined, tree.getParent());
				assertEquals(undefined, tree.getData());
				assertEquals(0, tree.getChildren().length);
			},
			
			unitTest_Tree_CreationWithData: function() {
				var tree = new Tree({data: Values[0]});
				
				// Run Tests
				assertEquals(tree, tree.getRoot());
				assertEquals(undefined, tree.getParent());
				assertEquals(Values[0], tree.getData());
				assertEquals(0, tree.getChildren().length);
			},
			
			unitTest_Tree_SetParent: function() {
				var parent = new Tree();
				var child = new Tree();
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
			
			unitTest_Tree_SetParentNull: function() {
				var parent = new Tree();
				var child = new Tree();
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
			
			unitTest_Tree_SetParentCircularDependency: function() {
				var parent = new Tree();
				var child = new Tree();
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
			
			unitTest_Tree_SetParentInvalidParent: function() {
				var parent = new Tree();
				var child = new Tree();
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
					child.setParent({"_topLevelClass" : "NotTree"}, {"_classStructure" : {"NotTree" : null}});
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
			
			unitTest_Tree_SetData: function() {
				var tree = new Tree({data: Values[0]});
				tree.setData(Values[1]);
				
				// Run Tests
				assertEquals(tree, tree.getRoot());
				assertEquals(undefined, tree.getParent());
				assertEquals(Values[1], tree.getData());
				assertEquals(0, tree.getChildren().length);
			},
			
			unitTest_Tree_AddChild: function() {
				var parent = new Tree();
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
			
			unitTest_Tree_AddChildWithData: function() {
				var parent = new Tree();
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
			
			unitTest_Tree_AddChildTree: function() {
				var parent = new Tree();
				var child = new Tree();
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
			
			unitTest_Tree_AddChildCircularDependency: function() {
				var parent = new Tree();
				var child = new Tree();
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
			
			unitTest_Tree_RemoveChild: function() {
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
			
			unitTest_Tree_RemoveChildInvalidChild: function() {
				var parent = new Tree();
				var child = new Tree();
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
					parent.removeChild({"_topLevelClass" : "NotTree"}, {"_classStructure" : {"NotTree" : null}});
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
			
			unitTest_Tree_CreateDeepTree: function() {
				var parent = new Tree();
				var child = parent.addChild();
				var subChild = child.addChild();
				
				assertNotEquals(undefined, child);
				assertNotEquals(undefined, subChild);
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(1, parent.getChildren().length);
				assertEquals(child, parent.getChildren()[0]);
				
				assertEquals(parent, child.getRoot());
				assertEquals(parent, child.getParent());
				assertEquals(undefined, child.getData());
				assertEquals(1, child.getChildren().length);
				assertEquals(subChild, child.getChildren()[0]);
				
				assertEquals(parent, subChild.getRoot());
				assertEquals(child, subChild.getParent());
				assertEquals(undefined, subChild.getData());
				assertEquals(0, subChild.getChildren().length);
			},
			
			unitTest_Tree_CreateWideTree: function() {
				var parent = new Tree();
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
				
				assertEquals(parent, child1.getRoot());
				assertEquals(parent, child1.getParent());
				assertEquals(undefined, child1.getData());
				assertEquals(0, child1.getChildren().length);
				
				assertEquals(parent, child2.getRoot());
				assertEquals(parent, child2.getParent());
				assertEquals(undefined, child2.getData());
				assertEquals(0, child2.getChildren().length);
			},
			
			unitTest_Tree_ClearChildren: function() {
				var parent = new Tree();
				var child1 = parent.addChild();
				var child2 = parent.addChild();
				parent.clearChildren();
				
				assertNotEquals(undefined, child1);
				assertNotEquals(undefined, child2);
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(0, parent.getChildren().length);
				
				assertEquals(child1, child1.getRoot());
				assertEquals(undefined, child1.getParent());
				assertEquals(undefined, child1.getData());
				assertEquals(0, child1.getChildren().length);
				
				assertEquals(child2, child2.getRoot());
				assertEquals(undefined, child2.getParent());
				assertEquals(undefined, child2.getData());
				assertEquals(0, child2.getChildren().length);
			},
			
			unitTest_Tree_OrphanTree: function() {
				var parent = new Tree();
				var child = parent.addChild();
				var subChild = child.addChild();
				child.setParent(null);
				
				assertNotEquals(undefined, child);
				assertNotEquals(undefined, subChild);
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(0, parent.getChildren().length);
				
				assertEquals(child, child.getRoot());
				assertEquals(undefined, child.getParent());
				assertEquals(undefined, child.getData());
				assertEquals(1, child.getChildren().length);
				assertEquals(subChild, child.getChildren()[0]);
				
				assertEquals(child, subChild.getRoot());
				assertEquals(child, subChild.getParent());
				assertEquals(undefined, subChild.getData());
				assertEquals(0, subChild.getChildren().length);
			},
			
			unitTest_Tree_OrphanTreeWithClearChildren: function() {
				var parent = new Tree();
				var child = parent.addChild();
				var subChild = child.addChild();
				parent.clearChildren();
				
				assertNotEquals(undefined, child);
				assertNotEquals(undefined, subChild);
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(0, parent.getChildren().length);
				
				assertEquals(child, child.getRoot());
				assertEquals(undefined, child.getParent());
				assertEquals(undefined, child.getData());
				assertEquals(1, child.getChildren().length);
				assertEquals(subChild, child.getChildren()[0]);
				
				assertEquals(child, subChild.getRoot());
				assertEquals(child, subChild.getParent());
				assertEquals(undefined, subChild.getData());
				assertEquals(0, subChild.getChildren().length);
			},
			
			unitTest_Tree_OrphanTreeWithRemoveChild: function() {
				var parent = new Tree();
				var child = parent.addChild();
				var subChild = child.addChild();
				parent.removeChild(child);
				
				assertNotEquals(undefined, child);
				assertNotEquals(undefined, subChild);
				assertEquals(parent, parent.getRoot());
				assertEquals(undefined, parent.getParent());
				assertEquals(undefined, parent.getData());
				assertEquals(0, parent.getChildren().length);
				
				assertEquals(child, child.getRoot());
				assertEquals(undefined, child.getParent());
				assertEquals(undefined, child.getData());
				assertEquals(1, child.getChildren().length);
				assertEquals(subChild, child.getChildren()[0]);
				
				assertEquals(child, subChild.getRoot());
				assertEquals(child, subChild.getParent());
				assertEquals(undefined, subChild.getData());
				assertEquals(0, subChild.getChildren().length);
			},
		}
	}
});