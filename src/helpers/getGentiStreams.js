export default function getGentiStreams(self, res, getTeamNameFromLabel) {

	let streamData = [];

	let gentiStreamsHTML = res.data;

	var el = document.createElement( 'html' );
	el.innerHTML = gentiStreamsHTML;
	var gameElements = el.getElementsByClassName('match-list-item');

	for (var i = gameElements.length - 1; i >= 0; i--) {

		let game = {
			teams: [],
			link: null
		};

		let gameHTML = gameElements[i];

		game.teams = [
			getTeamNameFromLabel( gameHTML.getElementsByClassName('team-name')[0].innerText.trim() ), 
			getTeamNameFromLabel( gameHTML.getElementsByClassName('team-name')[1].innerText.trim() )
		];

		game.link = gameHTML.getElementsByClassName('view-article')[0].href;

		streamData.push(game);
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
}