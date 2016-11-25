var HTMLGadget;
(function() {
	HTMLGadget = function(data) {
		throw new Error("HTMLGadget is an abstract class and cannot be created directly.");
	}

	HTMLGadget.prototype.initializeGadget = function(data) {
		this._fCSSClasses = " ";
		this._fData = {};
		this._fDomNode = null;
		
		HTMLGadget.prototype.setValue.call(this, data);
		this.addCSSClass(HTMLGadget.prototype._baseCSSClass);
	}
	
	HTMLGadget.prototype._baseCSSClass = "HTMLGadget";
	
	HTMLGadget.prototype.getValue = function() {
		return this._fData;
	}
	
	HTMLGadget.prototype.setValue = function(data) {
		if (data == null) {
			this._fData = {};
		} else if (typeof data === "object") {
			// Add remaining data to data object
			for(var key in data) {
				var value = data[key];
				if (value === undefined) {
					delete this._fData[key];
				} else {
					this._fData[key] = data[key];
				}
			}
		}
	}
	
	HTMLGadget.prototype.hasCSSClass = function(className) {
		if (typeof className === "string") {
			var classArray = className.split(/\s+/);
			if (classArray.length == 1) {
				return this._fCSSClasses.indexOf(" " + className + " ") >= 0;
			} else {
				for(var key in classArray) {
					if (!this.hasCSSClass(classArray[key])) {
						return false;
					}
				}
			}
		} else if (typeof className === "array" || typeof className === "object") {
			for(var key in className) {
				if (!this.hasCSSClass(className[key])) {
					return false;
				}
			}
			return true;
		}
		return false;
	}
	
	HTMLGadget.prototype._addCSSClass = function(self, className) {
		if (typeof className === "string") {
			var classArray = className.split(/\s+/);
			if (classArray.length == 1) {
				if (!self.hasCSSClass(className)) {
					self._fCSSClasses = self._fCSSClasses + className + " ";
				}
			} else {
				for(var key in classArray) {
					HTMLGadget.prototype._addCSSClass(self, classArray[key]);
				}
			}
		} else if (typeof className === "array" || typeof className === "object") {
			for(var key in className) {
				HTMLGadget.prototype._addCSSClass(self, className[key]);
			}
		}
	}
	
	HTMLGadget.prototype.addCSSClass = function(className) {
		HTMLGadget.prototype._addCSSClass(this, className);
		if (this._fDomNode != null) {
			var className = this.getCSSClass();
			if (className.length >= 0) {
				this._fDomNode.className = className;
			} else {
				this.clearCSSClass();
			}
		}
	}
	
	HTMLGadget.prototype._removeCSSClass = function(self, className) {
		if (typeof className === "string") {
			var classArray = className.split(/\s+/);
			if (classArray.length == 1) {
				if (self.hasCSSClass(className)) {
					self._fCSSClasses = self._fCSSClasses.replace(" " + className + " ", " ");
				}
			} else {
				for(var key in classArray) {
					HTMLGadget.prototype._removeCSSClass(self, classArray[key]);
				}
			}
		} else if (typeof className === "array" || typeof className === "object") {
			for(var key in className) {
				HTMLGadget.prototype._removeCSSClass(self, className[key]);
			}
		}
	}
	
	HTMLGadget.prototype.removeCSSClass = function(className) {
		HTMLGadget.prototype._removeCSSClass(this, className);
		if (this._fDomNode != null) {
			var className = this.getCSSClass();
			if (className.length >= 0) {
				this._fDomNode.className = className;
			} else {
				this.clearCSSClass();
			}
		}
	}
	
	HTMLGadget.prototype._toggleCSSClass = function(self, className, addClass) {
		if (typeof className === "string") {
			var classArray = className.split(/\s+/);
			if (classArray.length == 1) {
				if (addClass === true || (addClass == null && !self.hasCSSClass(className))) {
					HTMLGadget.prototype._addCSSClass(self, className);
				} else if (addClass === false || (addClass == null && self.hasCSSClass(className))) {
					HTMLGadget.prototype._removeCSSClass(self, className);
				}
			} else {
				for(var key in classArray) {
					HTMLGadget.prototype._toggleCSSClass(self, classArray[key]);
				}
			}
		} else if (typeof className === "array" || typeof className === "object") {
			for(var key in className) {
				HTMLGadget.prototype._toggleCSSClass(self, className[key]);
			}
		}
	}
	
	HTMLGadget.prototype.toggleCSSClass = function(className, addClass) {
		HTMLGadget.prototype._toggleCSSClass(this, className, addClass);
		if (this._fDomNode != null) {
			var className = this.getCSSClass();
			if (className.length >= 0) {
				this._fDomNode.className = className;
			} else {
				this.clearCSSClass();
			}
		}
	}
	
	HTMLGadget.prototype.clearCSSClass = function() {
		this._fCSSClasses = " ";
		if (this._fDomNode != null) {
			this._fDomNode.className = "";
		}
	}
	
	HTMLGadget.prototype.getCSSClass = function() {
		return this._fCSSClasses.trim();
	}
	
	HTMLGadget.prototype.destroyHTMLElement = function() {
		if (this._fDomNode.parentNode != null) {
			this._fDomNode.parentNode.removeChild(this._fDomNode);
		}
		this._fDomNode = null;
	}
})();