var TextGadgetTests;
(function() {
	var assertEquals = function(expected, actual) {
		if (expected != actual) {
			throw new Error("AssertEquals: Expected <" + expected + "> Actual <" + actual + ">");
		}
	}
	
	var assertNotEquals = function(expected, actual) {
		if (expected == actual) {
			throw new Error("AssertNotEquals: Expected <" + expected + "> Actual <" + actual + ">");
		}
	}

	TextGadgetTests = {
		suiteName: "TextGadgetTests",
	
		unitTest_TextGadget_CreateHTMLElement: function() {
			var gadget = new TextGadget();
			var html = gadget.getHTMLElement();
			assertEquals(HTMLGadget.prototype._baseCSSClass + " " + TextGadget.prototype._baseCSSClass, html.className);
			assertEquals("", html.innerHTML);
		}
	}
})();
