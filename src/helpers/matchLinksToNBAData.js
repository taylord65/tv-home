import axiosRetry from 'axios-retry';
import getNameFromIdentifier from './getNameFromIdentifier';

export default function matchLinksToNBAData(self, axios) {

	var teamURLIdentifier = [
		'boston',
		'brooklyn',
		'york',
		'lakers',
		'minnesota',
		'portland',
		'chicago',
		'milwaukee',
		'toronto',
		'orlando',
		'philadelphia',
		'cleveland',
		'detroit',
		'indiana',
		'atlanta',
		'charlotte',
		'miami',
		'washington',
		'denver',
		'oklahoma',
		'utah',
		'golden',
		'clippers',
		'phoenix',
		'sacramento',
		'dallas',
		'houston',
		'memphis',
		'orleans',
		'antonio'
	];

	let streamData = [];

	let getBothTeams = function(url){
		
		let bothTeams = [];

		for (var h = teamURLIdentifier.length - 1; h >= 0; h--) {
			if(url.includes(teamURLIdentifier[h])){
				bothTeams.push(getNameFromIdentifier(teamURLIdentifier[h]));
			}
		};

		return bothTeams;
	};

	let parseLinks = function(urls){

		for (var i = urls.length - 1; i >= 0; i--) {

			streamData.push({
				teams: getBothTeams(urls[i]),
				link: urls[i] + '/#REScommentSubToggle'
			});
		};

		//Assign link to the nbaData
		for (var f = self.state.nbaData.length - 1; f >= 0; f--) {
			for (var j = streamData.length - 1; j >= 0; j--) {
				if( (self.state.nbaData[f].teamA.name === streamData[j].teams[0]) ||
					(self.state.nbaData[f].teamA.name === streamData[j].teams[1]) ||
					(self.state.nbaData[f].teamH.name === streamData[j].teams[0]) ||
					(self.state.nbaData[f].teamH.name === streamData[j].teams[1])){
					self.state.nbaData[f].link = streamData[j].link;
				}
			};
		};
	};

	axiosRetry(axios, { retries: 500 });

    let lambdaHeaders = {'Content-Type': 'application/json', 'day': 'Thursday', 'x-amz-docs-region': 'us-east-2'};

    axios.post('https://wv6orehzyl.execute-api.us-east-1.amazonaws.com/prod/Seattle?time=evening', lambdaHeaders)
    .then(res => {
      parseLinks(res.data.nbaUrls); 
    })
    .catch(function (error) {
      console.log("Error in lambda"); //Should show in UI
    });
}