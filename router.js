module.exports = createRouter;
var url = require('url');
var vault = require('./vault');

function createRouter(req, res) {
	try{
		var parsedUrl = url.parse(req.url, true); 
		var query = parsedUrl.query;
		console.log(JSON.stringify(query));

		if (query.hasOwnProperty('text')) {
			console.log('-- text');
			ok(res, vault.store(query.text));		
			console.log('-- text.');
		} else if (query.hasOwnProperty('token')) {
			console.log('-- token');
			ok(res, vault.fetch(query.token));
			console.log('-- token.');
		} else {
			console.log('-- NOOP');
			ok(res, 'NOOP ' + pseudoRandomId() + ': ' + parsedUrl.href);
		}
	}catch(e){
		error(res, e);
	}
}

function ok(res, contents){
	console.log(contents);
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