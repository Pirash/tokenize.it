module.exports = createRouter;
var url = require('url');
var vault = require('./vault');

function createRouter(req, res) {
	try{
		var parsedUrl = url.parse(req.url, true); 
		var query = parsedUrl.query;

		if (query && query.value) {
			ok(res, vault.store(query.value));		
		} else if (query && query.token) {
			ok(res, vault.fetch(query.token));
		} else {
			ok(res, 'NOOP ' + pseudoRandomId() + ': ' + parsedUrl.href);
		}
	}catch(e){
		error(res, e);
	}
}

function ok(res, contents){
	res.writeHead(200);
	res.end(contents);
}

function error(res, reason){
	console.log('ERROR: ' + reason);
	res.writeHead(500);
	res.end(reason);
}

function pseudoRandomId(){
	return Math.floor(Math.random() * 65536).toString(16);
}