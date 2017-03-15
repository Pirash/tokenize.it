module.exports = createRouter

function createRouter(request, response) {
	console.log(request);
	response.writeHead(200);
	response.end('OK ' + pseudoRandomId());
}

function pseudoRandomId(){
	return Math.floor(Math.random() * 65536).toString(16);
}