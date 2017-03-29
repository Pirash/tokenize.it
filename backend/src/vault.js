exports = module.exports = vault;
exports.store = store;
exports.fetch = fetch;
exports.encrypt = encrypt;
exports.decrypt = decrypt;

var dtp = require('./dictionaryTokenProvider.js');
var crypto = require('crypto');

var db = {};
var MAX_INT = 9007199254740992;

function vault(){ 
}

function store(val){
  var encKey = buf = crypto.randomBytes(8).toString('hex');
  var token = dtp(3,'-');
  db[token] = encrypt(val, encKey);
  console.log('stored');
  return token + '-' + encKey;
}

function fetch(tokenAndKey){
  var token = tokenAndKey.split('-').slice(0,-1).join('-');
  var encKey = tokenAndKey.split('-').slice(-1);
  if(db.hasOwnProperty(token)){
    var encrypted = db[token];
    var res = decrypt(encrypted, encKey);
    delete(db[token]);
    return res;
  }else{
    throw "token not recognized";
  }
}

function encrypt(val, key){
  var cipher = crypto.createCipher('aes192', key);
  var encrypted = cipher.update(val, 'utf8', 'hex') + cipher.final('hex');
  return encrypted;
  
}

function decrypt(val, key){
  var decipher = crypto.createDecipher('aes192', key.toString('binary'));
  var decrypted = decipher.update(val, 'hex', 'utf8') + decipher.final('utf8');
  return decrypted;
}

function pseudoRandomToken(){
  return Math.floor(Math.random() * MAX_INT).toString(16);
}