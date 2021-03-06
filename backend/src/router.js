module.exports = createRouter;
var url = require('url');
var vault = require('./vault');
var qs = require('querystring');


  
  var test = "abc",
      enc = vault.encrypt(test, "klucz"),
      dec = vault.decrypt(enc, "klucz");
      
  console.log(test + " ---> " + enc + " ---> " + dec);



function createRouter(req, res) {
  try{
    var parsedUrl = url.parse(req.url, true); 

    if(req.method === 'POST'){
      var body = '';
      
      req.on('data', function (data) {
          body += data;
          if (body.length > 1e4)
              request.connection.destroy();
      });

      req.on('end', function () {
          var post = qs.parse(body);
          handlePost(post, res);
      });      
    }else{
      error(res, "Only POST allowed, got:" + req.method);  
    }
  }catch(e){
    error(res, e);
  }
}

function handlePost(post, res){
  try{
    if (post && post.value) {
      ok(res, vault.store(post.value));    
    } else if (post && post.token) {
      ok(res, vault.fetch(post.token));
    } else {
      ok(res, 'NOOP ' + pseudoRandomId());
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