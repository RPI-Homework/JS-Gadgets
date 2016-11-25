var TreeMap;
Require({
	defines: ["SimpleTypes/TreeMap.js"],
	onLoad: function() {
		TreeMap = function(data) {
			this._fParent = undefined;
			this._fChildren = {};
			this._fIdentifier = data == null || data.identifier == null ? Tree.prototype._uniqueIDCounter++ : data.identifier;
			this._fData = data == null ? undefined : data.data;
			this._fMap = {};
			this._fMap[this._fIdentifier] = this;
		}

		TreeMap.prototype._classStructure = {"SimpleTypes\\Tree" : null, "SimpleTypes\\TreeMap" : null};

		TreeMap.prototype._topLevelClass = "SimpleTypes\\TreeMap";

		TreeMap.prototype._setParent = function(parent, child) {
			// Remove current map from the old tree
			var oldParent = child._fParent;
			if (oldParent != null) {
				delete oldParent._fChildren[child._fIdentifier];
				while(oldParent != null) {
					for (var key in child._fMap) {
						delete oldParent._fMap[key];
					}
					oldParent = oldParent._fParent;
				}
			}
			
			// Add current map to the new tree
			if (parent != null) {
				var currentParent = parent;
				parent._fChildren[child._fIdentifier] = child;
				while(currentParent != null) {
					for (var key in child._fMap) {
						currentParent._fMap[key] = child._fMap[key];
					}
					currentParent = currentParent._fParent;
				}
			}
			
			// Set the parent value
			child._fParent = parent;
		}

		TreeMap.prototype.getIdentifier = function() {
			return this._fIdentifier;
		}

		TreeMap.prototype.getRoot = Tree.prototype.getRoot;

		TreeMap.prototype.getParent = Tree.prototype.getParent;

		TreeMap.prototype.setParent = Tree.prototype.setParent;

		TreeMap.prototype.getData = Tree.prototype.getData;

		TreeMap.prototype.setData = Tree.prototype.setData;

		TreeMap.prototype.hasDescendant = function(identifier) {
			return identifier in this._fMap;
		}

		TreeMap.prototype.getDescendant = function(identifier) {
			return this._fMap[identifier];
		}

		TreeMap.prototype.getChildren = function() {
			var children = [];
			for (var key in this._fChildren) {
				children.push(this._fChildren[key]);
			}
			return children;
		}

		TreeMap.prototype.addChild = function(data) {
			var child = null;
			if (data == null || data.child == null) {
				child = new TreeMap(data);
			} else {
				child = data.child;
			}
			
			// Child must be of type TreeMap or bigger
			if (child._classStructure != null && this._topLevelClass in child._classStructure) {
				if (child.hasDescendant(this._fIdentifier)) {
					throw new Error("Adding tree node <" + child._fIdentifier + "> as child of parent <" + this._fIdentifier + "> will create a circular dependency.");
				} else {
					// Check for identifier conflicts
					var rootElement = this.getRoot();
					var identifierConflict = null;
					for (var key in child._fMap) {
						if (rootElement.hasDescendant(key)) {
							identifierConflict = key;
							break;
						}
					}
				
					if (identifierConflict != null) {
						throw new Error("Adding tree node <" + child._fIdentifier + "> as child of parent <" + this._fIdentifier + "> will create identifier conflict on <" + identifierConflict + ">.");
					} else {
						this._setParent(this, child);
						return child;
					}
				}
			} else {
				throw new Error("Child must be a class of type \"" + this._topLevelClass + "\".");
			}
		}

		TreeMap.prototype.removeChild = Tree.prototype.removeChild;

		TreeMap.prototype.clearChildren = function() {
			// Reset the list of the children
			for (var key in this._fChildren) {
				this._setParent(undefined, this._fChildren[key]);
			}
		}
	}
});