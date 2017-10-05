const express = require('express')
const app = express()
const notifier = require('node-notifier');
var schedule = require('node-schedule');
var request = require('request-promise');
var _ = require('lodash');
const { spawn } = require('child_process');
const buyValue = .00129996;

var scheduleBitCoinResult = () => {
  schedule.scheduleJob('*/1 * * * *', function(){
  	request('https://bittrex.com/api/v1.1/public/getmarketsummaries').then(jsonData => {
		parseData(JSON.parse(jsonData).result);
	}).catch(e => {
		console.log(e);			
	});      
  });
};

app.listen(7676, function () {
	console.log('Sever started at 7676');
  scheduleBitCoinResult();
});


var notifyme = (title, message) => {
	notifier.notify({
	  'title': title,
	  'message': message
	});
	spawn("beep");
	spawn("beep");
};

var parseData = (bitData) => {
	var data = _.filter(bitData, ['MarketName', 'BTC-STRAT']);
	notifyme('BTC-STRAT', `Last Value:${data[0].Last} \n Buy value: ${buyValue} `);
	checkValue(data[0].Last);

};

var checkValue = (price) => {
if(price >= buyValue) {
		notifier.notify({
		  'title': 'BTC-STRATIS',
		  'message': 'SELL NOW'
		});
		spawn("beep -f880 -l500 -D 70 -n -f587.33 -l1000 -D 70 -n -f698.46 -l500 -D 70 -n -f880 -l500 -D 70 -n -f587.33 -l1000 -D 70 -n -f698.46 -l500 -D 70 -n -f880 -l250 -D 70 -n -f1046.50 -l250 -D 70 -n -f987.77 -l500 -D 70 -n -f783.99 -l500 -D 70 -n -f698.46 -l250 -D 70 -n -f783.99 -l250 -D 70 -n -f880 -l500 -D 70 -n -f587.33 -l500 -D 70 -n -f523.25 -l250 -D 70 -n -f659.26 -l250 -D 70 -n -f587.33 -l750");

		
}
};
