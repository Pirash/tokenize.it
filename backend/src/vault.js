exports = module.exports = vault;
exports.store = store;
exports.fetch = fetch;

var dtp = require('./dictionaryTokenProvider.js');

var db = {};
var MAX_INT = 9007199254740992;

function vault(){
}

function store(val){
	//console.log('store ' + val);
	//var token = pseudoRandomToken(); 
	var token = dtp(4,'-');
	//console.log('token: ' + token);
	db[token] = val;
	console.log('stored');
	return token;
}

function fetch(token){
	if(db.hasOwnProperty(token)){
		var result = db[token];
		delete(db[token]);
		return result;
	}else{
		throw "token not recognized";
	}
}

function pseudoRandomToken(){
	return Math.floor(Math.random() * MAX_INT).toString(16);
}