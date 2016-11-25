var HTMLGadgetTests;
(function() {
	var assertEquals = function(expected, actual) {
		if (expected !== actual) {
			throw new Error("AssertEquals: Expected <" + expected + "> Actual <" + actual + ">");
		}
	}
	
	var assertNotEquals = function(expected, actual) {
		if (expected === actual) {
			throw new Error("AssertNotEquals: Expected <" + expected + "> Actual <" + actual + ">");
		}
	}
	
	var assertNotNull = function(actual) {
		if (actual == null) {
			throw new Error("AssertNotNull: Actual <" + actual + ">");
		}
	}
	
	HTMLGadgetDummy = function(data) {
		this.initializeGadget(data);
	}
	
	HTMLGadgetDummy.prototype.initializeGadget = HTMLGadget.prototype.initializeGadget
	
	HTMLGadgetDummy.prototype.hasCSSClass = HTMLGadget.prototype.hasCSSClass;
	
	HTMLGadgetDummy.prototype.addCSSClass = HTMLGadget.prototype.addCSSClass;
	
	HTMLGadgetDummy.prototype.removeCSSClass = HTMLGadget.prototype.removeCSSClass;
	
	HTMLGadgetDummy.prototype.toggleCSSClass = HTMLGadget.prototype.toggleCSSClass;
	
	HTMLGadgetDummy.prototype.getCSSClass = HTMLGadget.prototype.getCSSClass;
	
	HTMLGadgetDummy.prototype.getValue = HTMLGadget.prototype.getValue;
	
	HTMLGadgetDummy.prototype.setValue = HTMLGadget.prototype.setValue
	
	HTMLGadgetDummy.prototype.destroyHTMLElement = HTMLGadget.prototype.destroyHTMLElement;

	HTMLGadgetTests = {
		suiteName: "HTMLGadgetTests",
	
		unitTest_HTMLGadget_InitializeGadget_Null: function() {
			var baseClass = HTMLGadget.prototype._baseCSSClass;
			var gadget = new HTMLGadgetDummy();
			assertEquals(baseClass, gadget.getCSSClass());
			assertEquals(true, gadget.hasCSSClass(baseClass));
			assertNotNull(gadget.getValue());
		},
		
		unitTest_HTMLGadget_InitializeGadget_Data: function() {
			var baseClass = HTMLGadget.prototype._baseCSSClass;
			var testData = { data: "dummyData" };
			var gadget = new HTMLGadgetDummy(testData);
			assertEquals(baseClass, gadget.getCSSClass());
			assertEquals(true, gadget.hasCSSClass(baseClass));
			assertEquals(testData.data, gadget.getValue().data);
		},
		
		unitTest_HTMLGadget_AddCSSClass_SingleClassString: function() {
			var baseClass = HTMLGadget.prototype._baseCSSClass;
			var testClass = "DummyClass";
			var gadget = new HTMLGadgetDummy();
			gadget.addCSSClass(testClass);
			
			assertEquals(baseClass + " " + testClass, gadget.getCSSClass());
			assertEquals(true, gadget.hasCSSClass(baseClass));
			assertEquals(true, gadget.hasCSSClass(testClass));
		},
		
		unitTest_HTMLGadget_AddCSSClass_SingleClassString_PreExisting: function() {
			var baseClass = HTMLGadget.prototype._baseCSSClass;
			var testClass = baseClass;
			var gadget = new HTMLGadgetDummy();
			gadget.addCSSClass(testClass);
			
			assertEquals(baseClass, gadget.getCSSClass());
			assertEquals(true, gadget.hasCSSClass(baseClass));
		},
		
		unitTest_HTMLGadget_AddCSSClass_MultiClassString: function() {
			var baseClass = HTMLGadget.prototype._baseCSSClass;
			var testClass1 = "DummyClass1"
			var testClass2 = "DummyClass2";
			var gadget = new HTMLGadgetDummy();
			gadget.addCSSClass(testClass1 + " " + testClass2);
			
			assertEquals(baseClass + " " + testClass1 + " " + testClass2, gadget.getCSSClass());
			assertEquals(true, gadget.hasCSSClass(baseClass));
			assertEquals(true, gadget.hasCSSClass(testClass1));
			assertEquals(true, gadget.hasCSSClass(testClass2));
		},
		
		unitTest_HTMLGadget_AddCSSClass_MultiClassString_PreExisting: function() {
			var baseClass = HTMLGadget.prototype._baseCSSClass;
			var testClass1 = "DummyClass1"
			var testClass2 = baseClass;
			var gadget = new HTMLGadgetDummy();
			gadget.addCSSClass(testClass1 + " " + testClass2);
			
			assertEquals(baseClass + " " + testClass1, gadget.getCSSClass());
			assertEquals(true, gadget.hasCSSClass(baseClass));
			assertEquals(true, gadget.hasCSSClass(testClass1));
		},
		
		unitTest_HTMLGadget_AddCSSClass_MultiClassArray: function() {
			var baseClass = HTMLGadget.prototype._baseCSSClass;
			var testClass1 = "DummyClass1"
			var testClass2 = "DummyClass2";
			var gadget = new HTMLGadgetDummy();
			gadget.addCSSClass([testClass1, testClass2]);
			
			assertEquals(baseClass + " " + testClass1 + " " + testClass2, gadget.getCSSClass());
			assertEquals(true, gadget.hasCSSClass(baseClass));
			assertEquals(true, gadget.hasCSSClass(testClass1));
			assertEquals(true, gadget.hasCSSClass(testClass2));
		},
		
		unitTest_HTMLGadget_AddCSSClass_MultiClassArray_PreExisting: function() {
			var baseClass = HTMLGadget.prototype._baseCSSClass;
			var testClass1 = "DummyClass1"
			var testClass2 = baseClass;
			var gadget = new HTMLGadgetDummy();
			gadget.addCSSClass([testClass1, testClass2]);
			
			assertEquals(baseClass + " " + testClass1, gadget.getCSSClass());
			assertEquals(true, gadget.hasCSSClass(baseClass));
			assertEquals(true, gadget.hasCSSClass(testClass1));
		},
		
		unitTest_HTMLGadget_AddCSSClass_MultiClassArrayOfArrays: function() {
			var baseClass = HTMLGadget.prototype._baseCSSClass;
			var testClass1 = "DummyClass1"
			var testClass2 = "DummyClass2";
			var gadget = new HTMLGadgetDummy();
			gadget.addCSSClass([[testClass1], [testClass2]]);
			
			assertEquals(baseClass + " " + testClass1 + " " + testClass2, gadget.getCSSClass());
			assertEquals(true, gadget.hasCSSClass(baseClass));
			assertEquals(true, gadget.hasCSSClass(testClass1));
			assertEquals(true, gadget.hasCSSClass(testClass2));
		},
		
		unitTest_HTMLGadget_AddCSSClass_MultiClassArrayOfArrays_PreExisting: function() {
			var baseClass = HTMLGadget.prototype._baseCSSClass;
			var testClass1 = "DummyClass1"
			var testClass2 = baseClass;
			var gadget = new HTMLGadgetDummy();
			gadget.addCSSClass([[testClass1], [testClass2]]);
			
			assertEquals(baseClass + " " + testClass1, gadget.getCSSClass());
			assertEquals(true, gadget.hasCSSClass(baseClass));
			assertEquals(true, gadget.hasCSSClass(testClass1));
		},
		
		unitTest_HTMLGadget_AddCSSClass_MultiClassObject: function() {
			var baseClass = HTMLGadget.prototype._baseCSSClass;
			var testClass1 = "DummyClass1"
			var testClass2 = "DummyClass2";
			var gadget = new HTMLGadgetDummy();
			gadget.addCSSClass({testClass1: testClass1, testClass2: testClass2});
			
			assertEquals(baseClass + " " + testClass1 + " " + testClass2, gadget.getCSSClass());
			assertEquals(true, gadget.hasCSSClass(baseClass));
			assertEquals(true, gadget.hasCSSClass(testClass1));
			assertEquals(true, gadget.hasCSSClass(testClass2));
		},
		
		unitTest_HTMLGadget_AddCSSClass_MultiClassObject_PreExisting: function() {
			var baseClass = HTMLGadget.prototype._baseCSSClass;
			var testClass1 = "DummyClass1"
			var testClass2 = baseClass;
			var gadget = new HTMLGadgetDummy();
			gadget.addCSSClass({testClass1: testClass1, testClass2: testClass2});
			
			assertEquals(baseClass + " " + testClass1, gadget.getCSSClass());
			assertEquals(true, gadget.hasCSSClass(baseClass));
			assertEquals(true, gadget.hasCSSClass(testClass1));
		},
		
		unitTest_HTMLGadget_AddCSSClass_MultiClassObjectOfObjects: function() {
			var baseClass = HTMLGadget.prototype._baseCSSClass;
			var testClass1 = "DummyClass1"
			var testClass2 = "DummyClass2";
			var gadget = new HTMLGadgetDummy();
			gadget.addCSSClass({testClass1: {testClass1: testClass1}, testClass2: {testClass2: testClass2}});
			
			assertEquals(baseClass + " " + testClass1 + " " + testClass2, gadget.getCSSClass());
			assertEquals(true, gadget.hasCSSClass(baseClass));
			assertEquals(true, gadget.hasCSSClass(testClass1));
			assertEquals(true, gadget.hasCSSClass(testClass2));
		},
		
		unitTest_HTMLGadget_AddCSSClass_MultiClassObjectOfObjects_PreExisting: function() {
			var baseClass = HTMLGadget.prototype._baseCSSClass;
			var testClass1 = "DummyClass1"
			var testClass2 = baseClass;
			var gadget = new HTMLGadgetDummy();
			gadget.addCSSClass({testClass1: {testClass1: testClass1}, testClass2: {testClass2: testClass2}});
			
			assertEquals(baseClass + " " + testClass1, gadget.getCSSClass());
			assertEquals(true, gadget.hasCSSClass(baseClass));
			assertEquals(true, gadget.hasCSSClass(testClass1));
		}		
	}
})();