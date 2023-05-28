module.exports = Waechter;
const https = require('https');

function Waechter(config) {
	this.config=config;
	return this;
}

Waechter.prototype.get = function (callback) {
	let now=Math.round(Date.now()/1000);
	callback(JSON.stringify({}));
}

Waechter.prototype.update = function (callback) {
	callback(JSON.stringify({}));
}

function JSON_parse(json) {let o=new Object(); try {o=JSON.parse(json)} catch (error) {o.data=json;o.error=error;} return o;} // returns object in any case, empty object if parsing fails
function stopwatch(startdate) {if (typeof startdate != 'undefined') {return new Date()-startdate} else {return new Date().getTime()}}

Waechter.prototype.request = function (method,path,headers,body,callback) {
	let o = new Object();
	o.hostname=this.config.hostname;
	o.port=443;
	o.method=method||'GET';
	o.path=path||'';
	o.headers=headers||undefined;
	console.log('REQUEST: '+JSON.stringify(o)); // DEBUG
	let req = https.request(o, res => {
		let r=''; //if (is_binary) {res.setEncoding('binary')};
		res.on('data', d => {r+=d})
		res.on('end', function () {callback(r);console.log('RESULT: '+r)}) // console.log(r); // DEBUG
	})
	req.on('error', error => {console.error('==ERROR== ',error)})
	req.write(body);
	req.end();
}
