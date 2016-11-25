var Require;
(function() {
	Require = function(parameters) {
		var requests = [];
		var defines = parameters.defines;
		if (typeof defines === "array" || typeof defines === "object") {
			for (var key in defines) {
				var define = defines[key];
				if (typeof define === "string") {
					var request = Require.prototype._getRequest(define);
					request.onLoad = parameters.onLoad;
					request.orginalParameters = parameters;
					Require.prototype._onRequestLoaded(request);
					requests.push(request);
				}
			}
		} else if (typeof defines === "string") {
			var request = Require.prototype._getRequest(define);
			request.onLoad = parameters.onLoad;
			request.orginalParameters = parameters;
			Require.prototype._onRequestLoaded(request);
			requests.push(request);
		}
		
		var requestLength = requests.length;
		if (requestLength === 0) {
			// If nothing is defined, but files are required to be loaded
			var request = Require.prototype._getRequest(null);
			request.onLoad = parameters.onLoad;
			request.orginalParameters = parameters;
			Require.prototype._onRequestLoaded(request);
			requests.push(request);
			requestLength = 1;
		}
		
		// List of everything which needs to be processed
		var requires = parameters.requires;
		if (typeof requires === "array" || typeof requires === "object") {
			for (var key in requires) {
				var requirementFile = requires[key];
				if (typeof requirementFile === "string") {
					var requirement = Require.prototype._getRequest(requirementFile);
					if (!Require.prototype._isRequestProcessed(requirement)) {
						// Add pre-process requirements
						for (var i = 0; i < requestLength; i++) {
							var request = requests[i];
							request.requires[requirement.id] = requirement;
							requirement.requiredBy.push(request);
						}
						Require.prototype._loadRequest(requirement);
					}
				}
			}
		}
		
		// List of everything which needs to be loaded
		var desires = parameters.desires;
		if (typeof desires === "array" || typeof desires === "object") {
			for (var key in desires) {
				var desiredFile = desires[key];
				if (typeof desiredFile === "string") {
					var desire = Require.prototype._getRequest(desiredFile);
					if (!Require.prototype._isRequestLoaded(desire)) {
						// Add pre-process requirements
						for (var i = 0; i < requestLength; i++) {
							var request = requests[i];
							request.desires[requirement.id] = requirement;
							requirement.desiredBy.push(request);
						}
						Require.prototype._loadRequest(requirement);
					}
				}
			}
		}
		
		// List of everything to pre-load
		var includes = parameters.includes;
		if (typeof includes === "array" || typeof includes === "object") {
			for (var key in includes) {
				var includeFile = includes[key];
				if (typeof includeFile === "string") {
					var include = Require.prototype._getRequest(includeFile);
					if (!Require.prototype._isRequestRequested(include.isRequested)) {
						Require.prototype._loadRequest(include);
					}
				}
			}
		}
		
		// Check if all requirements are loaded, then process the file if they are
		for (var i = 0; i < requestLength; i++) {
			var request = requests[i];
			if (Require.prototype._canProcessRequest(request)) {
				Require.prototype._processRequest(request);
			}
		}
	};

	Require.prototype.isLoaded = function(files) {
		if (typeof files === "array" || typeof files === "object") {
			for (var file in files) {
				if (!isLoaded(files[file])) {
					return false;
				}
			}
			return true;
		} else if (typeof files === "string") {
			var request = Require.prototype._allRequests[files];
			if (request != null) {
				return Require.prototype._isRequestLoaded(request);
			}
		}
		return false;
	};
	
	Require.prototype.isProcessed = function(files) {
		if (typeof files === "array" || typeof files === "object") {
			for (var file in files) {
				if (!isProcessed(files[file])) {
					return false;
				}
			}
			return true;
		} else if (typeof files === "string") {
			var request = Require.prototype._allRequests[files];
			if (request != null) {
				return Require.prototype._isRequestProcessed(request);
			}
		}
		return false;
	};

	Require.prototype._fileLocationMap = {};
	Require.prototype._rootDirectory = "file://localhost/D:/Users/Joseph/Websites/Gadgets/v0.0.2.1/";
	Require.prototype._allFiles = {};
	Require.prototype._allRequests = {};
	
	Require.prototype._loadJS = function(url, callback) {
		// Adding the script tag to the head as suggested before
		var head = document.getElementsByTagName("head")[0];
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;

		// Then bind the event to the callback function.
		// There are several events for cross browser compatibility.
		script.onload = callback;

		// Fire the loading
		head.appendChild(script);
	};
	
	Require.prototype._loadFile = function(file) {
		// Only load file if it isn't already loading or loaded
		if (file && !file.isRequested) {
			var onFileLoad = function() {
				if (!file.isLoaded) {
					Require.prototype._onFileLoaded(file);
					for (var request in file.requests) {
						Require.prototype._processRequest(file.requests[request]);
					}
				}
			}
			if (file.type === "js") {
				file.isRequested = true;
				Require.prototype._loadJS(file.id, onFileLoad);
			} else if (file.type === "json") {
			} else if (file.type === "xml") {
			} else if (file.type === "css") {
			} else if (file.type === "html") {
			} else if (file.type === "image") {
			} else {
				// Assume type === "text"
			}
		}
	}
	
	Require.prototype._loadRequest = function(request) {
		Require.prototype._loadFile(request.file);
	}
	
	Require.prototype._getFileLocation = function(fileParameters) {
		var fileLocation = fileParameters;
		if (typeof fileParameters === "object") {
			fileLocation = fileParameters.location
		}
		var mappedFileLocation = Require.prototype._fileLocationMap[fileLocation];
		return mappedFileLocation ? mappedFileLocation : Require.prototype._rootDirectory + fileLocation;
	}
	
	Require.prototype._getFileType = function(fileParameters) {
		if (typeof fileParameters === "object" && fileParameters.type) {
			return fileParameters.type.toLowerCase();
		}
		
		var fileLocation = Require.prototype._getFileLocation(fileParameters);
		
		var type = fileLocation.split(".");
		if (type.length < 2) {
			return "text";
		} else {
			type = type[type.length - 1].toLowerCase();
			if (type === "js" || type === "script") {
				return "js";
			} else if (type === "dot" || type === "json") {
				return "json";
			} else if (type === "xml") {
				return "xml";
			} else if (type === "css") {
				return "css";
			} else if (type === "html" || type === "htm" || type === "xhtml") {
				return "html";
			} else if (type === "png" || type === "gif" || type === "jpeg" || type === "jpg" || type === "bmp") {
				return "image";
			} else {
				return "text";
			}
		}
	}
	
	Require.prototype._getFile = function(fileParameters) {
		var fileLocation = Require.prototype._getFileLocation(fileParameters);
		var file = Require.prototype._allFiles[fileLocation];
		if (file == null) {
			file = {
				id: fileLocation,
				type: Require.prototype._getFileType(fileParameters),
				isRequested: false,
				isLoaded: false,
				requests: []
			};
			Require.prototype._allFiles[fileLocation] = file;
		}
		return file;
	}
	
	Require.prototype._createRequest = function(file) {
		var request = {
			id: file,
			isProcessed: false,
			desiredBy: [],
			requiredBy: [],
			requires: {},
			desires: {}
		};
		if (file != null) {
			request.file = Require.prototype._getFile(file);
			request.file.requests.push(request);
		}
		return request;
	}
	
	Require.prototype._getRequest = function(file) {
		if (!file) {
			return Require.prototype._createRequest(file);
		} else {
			var request = Require.prototype._allRequests[file];
			if (request == null) {
				request = Require.prototype._createRequest(file);
				Require.prototype._allRequests[file] = request;
			}
			return request;
		}
	}
	
	Require.prototype._processRequest = function(request) {
		// Only process file if it isn't already processed
		if (request && !request.isProcessed) {
			if (request.onLoad) {
				request.onLoad(request);
			}
			Require.prototype._onRequestProcessed(request);
		}
	}
	
	Require.prototype._isRequestRequested = function(request) {
		return !request || !request.file || request.file.isRequested === true;
	}
	
	Require.prototype._isRequestLoaded = function(request) {
		return !request || !request.file || request.file.isLoaded === true;
	}
	
	Require.prototype._isRequestProcessed = function(request) {
		return !request || request.isProcessed === true;
	}
	
	Require.prototype._canProcessRequest = function(request) {
		for (var key1 in request.requires) {
			return false;
		}
		for (var key2 in request.desires) {
			return false;
		}
		return true;
	}
	
	Require.prototype._onFileLoaded = function(file) {
		file.isRequested = true;
		file.isLoaded = true;
		
		// Update all the requests of that file
		for (var request in file.requests) {
			Require.prototype._onRequestLoaded(file.requests[request]);
		}
	}
	
	Require.prototype._onRequestLoaded = function(request) {
		if (!Require.prototype._isRequestLoaded(request)) {
			Require.prototype._onFileLoaded(request.file);
		} else {
			// Remove request from all file load wait queues
			var desiredBy = request.desiredBy;
			for (var key in desiredBy) {
				// Remove request from file wait queue 
				var desiredBy = desiredBy[key];
				
				// Update the desiry
				delete desiry.desires[request.id];
				
				// If the desiry is not waiting on anything else, process it
				if (Require.prototype._canProcessRequest(desiry)) {
					Require.prototype._processRequest(desiry);
				}
			}
			
			// Remove load waits as file is already loaded
			delete request.desiredBy;
		}
	}
	
	Require.prototype._onRequestProcessed = function(request) {
		request.isProcessed = true;
		
		// Remove request from all file process wait queues
		var requiredBy = request.requiredBy;
		for (var key in requiredBy) {
			// Remove request from file wait queue 
			var requiry = requiredBy[key];
			
			// Update the requiry
			delete requiry.requires[request.id];
			
			// If the requiry is not waiting on anything else, process it
			if (Require.prototype._canProcessRequest(requiry)) {
				Require.prototype._processRequest(requiry);
			}
		}
		
		// Remove process waits as file is already processed
		delete request.requiredBy;
	}
})();