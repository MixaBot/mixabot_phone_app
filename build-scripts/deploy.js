var client = require('scp2');
var minimist = require('minimist');
var args = minimist(process.argv.slice(2));

var user = process.env.FTP_USER;
var password = process.env.FTP_PASSWORD;
var host = 'sirmixabot.com';
var remotePath = '/home/sirm41338620936/html/phoneapp/';
console.log(`${user}:${password}@${host}:${remotePath}`);
client.scp('www/', `${user}:${password}@${host}:${remotePath}`, err => {
  console.log('ERROR', err);
});
