var Tree;
Require({
	defines: ["SimpleTypes/Tree.js"],
	onLoad: function() {
		Tree = function(data) {
			this._fParent = undefined;
			this._fChildren = {};
			this._fIdentifier = Tree.prototype._uniqueIDCounter++;
			this._fData = data == null ? undefined : data.data;
		}

		Tree.prototype._classStructure = {"SimpleTypes\\Tree" : null};

		Tree.prototype._topLevelClass = "SimpleTypes\\Tree";

		Tree.prototype._uniqueIDCounter = 0;

		Tree.prototype._setParent = function(parent, child) {
			// Remove child from old tree
			if (child._fParent != null) {
				delete child._fParent._fChildren[child._fIdentifier];
			}
			
			// Add child to new tree
			if (parent != null) {
				parent._fChildren[child._fIdentifier] = child;
			}
			
			child._fParent = parent;
		}

		Tree.prototype.getRoot = function() {
			var parent = this._fParent;
			if (parent == null) {
				return this;
			}
			while(parent._fParent != null) {
				parent = parent._fParent;
			}
			return parent;
		}

		Tree.prototype.getParent = function() {
			return this._fParent;
		}

		Tree.prototype.setParent = function(parent) {
			if (parent == null) {
				// Remove current map from the old tree
				if (this._fParent != null) {
					this._fParent.removeChild(this)
				}
			} else {
				if (parent._classStructure != null && this._topLevelClass in parent._classStructure) {
					parent.addChild({ child : this });
				} else {
					throw new Error("Parent must be of type \"" + this._topLevelClass + "\".");
				}
			}
		}

		Tree.prototype.getData = function() {
			return this._fData;
		}

		Tree.prototype.setData = function(data) {
			this._fData = data;
		}

		Tree.prototype.getChildren = function() {
			var children = [];
			for (var key in this._fChildren) {
				children.push(this._fChildren[key]);
			}
			return children;
		}

		Tree.prototype.addChild = function(data) {
			var child = null;
			if (data == null || data.child == null) {
				child = new Tree(data);
			} else {
				child = data.child;
			}
			
			// Child must be of type TreeMap or bigger
			if (child._classStructure != null && this._topLevelClass in child._classStructure) {
				var oldParent = child._fParent;
				if (oldParent != null) {
					child._fParent = undefined;
				}
				if (child == this.getRoot()) {
					child._fParent = oldParent;
					throw new Error("Adding tree node <" + child._fIdentifier + "> as child of parent <" + this._fIdentifier + "> will create a circular dependency.");
				} else {
					child._fParent = oldParent;
					this._setParent(this, child);
					return child;
				}
			} else {
				throw new Error("Child must be a class of type \"" + this._topLevelClass + "\".");
			}
		}

		Tree.prototype.removeChild = function(child) {
			if (child != null && child._classStructure != null && this._topLevelClass in child._classStructure && child._fIdentifier in this._fChildren) {
				this._setParent(undefined, child);
			}  else {
				throw new Error("Child <" + child._fIdentifier + "> does not belong to \"" + this._fIdentifier + "\".");
			}
		}

		Tree.prototype.clearChildren = function() {
			for (var key in this._fChildren) {
				this._fChildren[key]._fParent = undefined;
			}
			this._fChildren = {};
		}
	}
});