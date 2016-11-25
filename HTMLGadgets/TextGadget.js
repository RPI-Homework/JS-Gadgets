var TextGadget;
(function() {
	TextGadget = function(data) {
		this.initializeGadget(data);
	}
	
	TextGadget.prototype.initializeGadget = function(data) {
		HTMLGadget.prototype.initializeGadget.call(this, data);
		this._fValue = data == null ? null : data.value;
		this.addCSSClass(TextGadget.prototype._baseCSSClass);
	}
	
	TextGadget.prototype._baseCSSClass = "TextGadget";
	
	TextGadget.prototype.hasCSSClass = HTMLGadget.prototype.hasCSSClass;
	
	TextGadget.prototype.addCSSClass = HTMLGadget.prototype.addCSSClass;
	
	TextGadget.prototype.removeCSSClass = HTMLGadget.prototype.removeCSSClass;
	
	TextGadget.prototype.toggleCSSClass = HTMLGadget.prototype.toggleCSSClass;
	
	TextGadget.prototype.getCSSClass = HTMLGadget.prototype.getCSSClass;
	
	TextGadget.prototype.getHTMLElement = function() {
		if (this._fDomNode == null) {
			// Create node
			this._fDomNode = document.createElement("div");
			this._fDomNode.className = this.getCSSClass();
			
			// Add text node
			var textNode = document.createTextNode(this._fValue == null ? "" : this._fValue);
			this._fDomNode.appendChild(textNode);
		}
		return this._fDomNode;
	}
	
	TextGadget.prototype.getValue = HTMLGadget.prototype.getValue;
	
	TextGadget.prototype.setValue = function(data) {
		if (this._fDomNode != null) {
			// Destroy the text node
			while (this._fDomNode.firstChild) {
				this._fDomNode.removeChild(this._fDomNode.firstChild);
			}
			
			// Add text node
			var textNode = document.createTextNode(this._fValue == null ? "" : this._fValue);
			this._fDomNode.appendChild(textNode);
		}
		
		// Set the value
		HTMLGadget.prototype.setValue.call(this, data);
		this._fValue = data == null ? null : data.value;
	}
	
	TextGadget.prototype.destroyHTMLElement = HTMLGadget.prototype.destroyHTMLElement;
})();
