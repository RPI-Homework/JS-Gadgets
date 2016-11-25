var OrderedMap;
Require({
	defines: ["SimpleTypes/OrderedMap.js"],
	onLoad: function() {
		OrderedMap = function() {
			this._fPairByPosition = [];
			this._fValueByIdentifier = {};
			this._fPositionByIdentifier = {};
			this._fInvalidPosition = Number.POSITIVE_INFINITY;
		};

		OrderedMap.prototype._classStructure = {"SimpleTypes\\OrderedMap" : null};

		OrderedMap.prototype._topLevelClass = "SimpleTypes\\OrderedMap";
		 
		OrderedMap.prototype._reorderMap = function() {
			var endPosition = this._fPairByPosition.length;
			for (var i = this._fInvalidPosition; i < endPosition; i++) {
				var pair = this._fPairByPosition[i];
				this._fPositionByIdentifier[pair.identifier] = i;
			}
		};
		 
		OrderedMap.prototype.addValue = function(identifier, value, position) {
			var pos = -1;
			if (this.hasIdentifier(identifier)) {
				throw new Error("Identifier Conflict: " + identifier);
			} else {
				if (position != null) {
					pos = parseInt(position);
					if (!(0 <= pos && pos < this._fPairByPosition.length) || isNaN(pos)) {
						pos = -1;
					}
				}
				
				if (pos == -1) {
					pos = this._fPairByPosition.length;
					this._fPairByPosition.push({identifier: identifier, value: value});
					this._fValueByIdentifier[identifier] = value;
					this._fPositionByIdentifier[identifier] = pos;
				} else if (pos == 0) {
					this._fPairByPosition.unshift({identifier: identifier, value: value});
					this._fValueByIdentifier[identifier] = value;
					this._fPositionByIdentifier[identifier] = pos;
					this._fInvalidPosition = 0;
				} else {
					this._fPairByPosition.splice(pos, 0, {identifier: identifier, value: value});
					this._fValueByIdentifier[identifier] = value;
					this._fPositionByIdentifier[identifier] = pos;
					if (pos < this._fInvalidPosition) {
						this._fInvalidPosition = pos;
					}
				}
			}
			return pos;
		};

		OrderedMap.prototype.getIdentifierByPosition = function(position) {
			if (position != null) {
				var pos = parseInt(position);
				if (0 <= pos && pos < this._fPairByPosition.length && !isNaN(pos)) {
					return this._fPairByPosition[pos].identifier;
				}
			}
			return undefined;
		};

		OrderedMap.prototype.getValueByPosition = function(position) {
			if (position != null) {
				var pos = parseInt(position);
				if (0 <= pos && pos < this._fPairByPosition.length && !isNaN(pos)) {
					return this._fPairByPosition[pos].value;
				}
			}
			return undefined;
		};

		OrderedMap.prototype.getValueByIdentifier = function(identifier) {
			return this._fValueByIdentifier[identifier];
		};

		/*
		 * Potentially slow due to a call to _reorderMap();
		 */
		OrderedMap.prototype.getPositionByIdentifier = function(identifier) {
			var pos = this._fPositionByIdentifier[identifier];
			if (pos == null) {
				return undefined;
			} else if (pos < this._fInvalidPosition) {
				return pos;
			} else {
				this._reorderMap();
				return this._fPositionByIdentifier[identifier];
			}
		};

		OrderedMap.prototype.hasIdentifier = function(identifier) {
			return identifier in this._fPositionByIdentifier;
		};

		OrderedMap.prototype.getLength = function() {
			return this._fPairByPosition.length;
		};

		OrderedMap.prototype.getArray = function(identifier) {
			return this._fPairByPosition;
		};

		OrderedMap.prototype.clear = function() {
			this._fPairByPosition = [];
			this._fValueByIdentifier = {};
			this._fPositionByIdentifier = {};
			this._fInvalidPosition = Number.POSITIVE_INFINITY;
		};

		OrderedMap.prototype.removeByPosition = function(position) {
			if (position != null) {
				var pos = parseInt(position);
				if (0 <= pos && pos < this._fPairByPosition.length && !isNaN(pos)) {
					var value = undefined;
					if (pos === (this._fPairByPosition.length - 1)) {
						value = this._fPairByPosition.pop();
					} else if (pos === 0) {
						value = this._fPairByPosition.shift();
						this._fInvalidPosition = 0;				
					} else {
						value = this._fPairByPosition.splice(pos, 1)[0];
						if (pos < this._fInvalidPosition) {
							this._fInvalidPosition = pos;
						}
					}
					
					if (value != null) {
						delete this._fValueByIdentifier[value.identifier];
						delete this._fPositionByIdentifier[value.identifier];
						return value;
					}
				}
			}
			return undefined;
		};

		/*
		 * Potentially slow due to a call to _reorderMap();
		 */
		OrderedMap.prototype.removeByIdentifier = function(identifier) {
			var pos = this._fPositionByIdentifier[identifier];
			if (pos != null) {
				if (pos >= this._fInvalidPosition) {
					this._reorderMap();
					pos = this._fPositionByIdentifier[identifier];
				}
				delete this._fValueByIdentifier[identifier];
				delete this._fPositionByIdentifier[identifier];
				
				if (pos === (this._fPairByPosition.length - 1)) {
					return this._fPairByPosition.pop();
				} else if (pos === 0) {
					this._fInvalidPosition = 0;
					return this._fPairByPosition.shift();	
				} else {
					if (pos < this._fInvalidPosition) {
						this._fInvalidPosition = pos;
					}
					return this._fPairByPosition.splice(pos, 1)[0];
				}
			}
			return undefined;
		};
	}
});