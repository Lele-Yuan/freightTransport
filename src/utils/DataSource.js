

let DataSource = {}

function isObject(value){
	return value !== null && typeof value === 'object';
}

function toObject(datastr) {
	var obj = datastr;
	if (!!datastr) {
		try {
			obj = JSON.parse(datastr);
		} catch (e) {
			obj = datastr;
		}
	}
	return obj;
}

function toString(obj) {
	if (isObject(obj)) {
		return JSON.stringify(obj);
	}
	return obj;
}

DataSource.LOCAL = 1
DataSource.SESSION = 2
DataSource.get = function (key, scope) {
	var _data = undefined;
	if (1 == scope) {
		_data = localStorage.getItem(key);
	} else if (2 == scope) {
		_data = sessionStorage.getItem(key);
	}
	if (!!_data) {
		_data = toObject(_data);
	}
	return _data;
}

DataSource.set = function (key, value, scope) {


	if (1 == scope) {
		localStorage.setItem(key, toString(value));
	} else if (2 == scope) {
		sessionStorage.setItem(key, toString(value));
	}
}
DataSource.del = function (key, scope) {
	if (1 == scope) {
		localStorage.removeItem(key);
	} else if (2 == scope) {
		sessionStorage.removeItem(key);
	}
}
DataSource.clear = function (scope) {
	if (1 == scope) {
		localStorage.clear();
	} else if (2 == scope) {
		sessionStorage.clear();
	} else {
		localStorage.clear();
		sessionStorage.clear();
	}
}



export default DataSource
