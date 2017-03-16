module.exports = get
"use strict"
var rnd = require('random-js');
var fs = require('fs');

var randEngine;
var assetFile = './assets/english-words.txt';
var others = [];
var adverbs = []; 
var gerunds = []; 
var numbers = [];

init();

function get(count, separator){
	var token = '';
	var countLessOne = count - 1;
	for(var i = 0; i < count; i++){
		var dict = getDictionary(i);
		var word = getRandomItem(dict);
		token += word;
		if(i < countLessOne) token += separator;
	}
	return token;
}

function getRandomItem(list){
	var index = rnd.integer(0, list.length-1)(randEngine);
	return list[index];
}

function getDictionary(index){
	switch (index % 4){
		case 0: return adverbs;
		case 1: return gerunds;
		case 2: return others;
		case 3: return numbers;
	}
	throw "Dictionary choice error";
}

function init(){
	console.log('init');
	randEngine = rnd.engines.mt19937();
	randEngine.autoSeed();

	var contents = fs.readFileSync(assetFile, {encoding :'UTF-8'});
	var lines = contents.split(/\s+/);
	var linesCount = lines.length;
	for(var i = 0; i < linesCount; i++){
		var line = lines[i];
		categorize(line);
	};
	populateWithNumbers(numbers, 0,999);
	
	console.log(others.length);
	console.log(others.slice(1,5));
	console.log(adverbs.length);
	console.log(adverbs.slice(1,5));
	console.log(gerunds.length);
	console.log(gerunds.slice(1,5));
	console.log(numbers.length);
	console.log(numbers.slice(1,5));
}

function categorize(word){
	if(word.indexOf("'") > -1) {
		//ignored
	}else if(endsWith(word, 'ly')) {
		//console.log('adverb:' + word);
		adverbs.push(word);
	} else if(endsWith(word, 'ing')) {
		//console.log('gerund:' + word);
		gerunds.push(word);
	} else if(word !== ''){
		//console.log('other:' + word);
		others.push(word);
	}
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function populateWithNumbers(arr, start, end){
	for(var i = start; i <= end; i++){
		numbers.push(padLeft(i.toString(), '0', 3)); 
	}
}

function padLeft(txt, padChar, length){
	var pad = Array(length - txt.length + 1).join(padChar);
	return pad + txt;
}

