export default function processNBAData(self, res) {

    var string = res.data;

    var lineScore_variable = "window.nbaStatsLineScore = ";
    var gameInfo_variable = "window.nbaStatsGameInfo = ";
    var secondvariable = ";";

    var scores = JSON.parse(string.match(new RegExp(lineScore_variable + "(.*)" + secondvariable))[1]);
    var data = JSON.parse(string.match(new RegExp(gameInfo_variable + "(.*)" + secondvariable))[1]);

    var nbaData = [];

    for (var i = data.length - 1; i >= 0; i--) {

      let game = {
        teamA: {
          name: null,
          imgSrc: null
        },
        teamH: {
          name: null,
          imgSrc: null
        },
        time: null
      };

      let snippet = data[i].GAMECODE.split('/');

      let teamsSnippet = snippet[1];

      game.teamA.name = teamsSnippet.substring(0,3);
      game.teamH.name = teamsSnippet.substring(3,6);

      game.time = data[i].GAME_STATUS_TEXT;



      if(game.teamA.name === 'NOP'){
        game.teamA.name = 'NO';
      }

      if(game.teamH.name === 'NOP'){
        game.teamH.name = 'NO';
      }

      if(game.teamA.name === 'UTA'){
        game.teamA.name = 'UTH';
      }

      if(game.teamH.name === 'UTA'){
        game.teamH.name = 'UTH';
      }

      //The images have exceptions for NOP and UTA
      game.teamA.imgSrc = 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/' + game.teamA.name + '.png';
      game.teamH.imgSrc = 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/' + game.teamH.name + '.png';


      //Revert back after
      if(game.teamA.name === 'NO'){
        game.teamA.name = 'NOP';
      }

      if(game.teamH.name === 'NO'){
        game.teamH.name = 'NOP';
      }

      if(game.teamA.name === 'UTH'){
        game.teamA.name = 'UTA';
      }

      if(game.teamH.name === 'UTH'){
        game.teamH.name = 'UTA';
      }


      nbaData.push(game);
    };

    for (var j = scores.length - 1; j >= 0; j--) {

    	for (var k = nbaData.length - 1; k >= 0; k--) {
    		if(nbaData[k].teamA.name === scores[j].TEAM_ABBREVIATION){          
    			nbaData[k].teamA.label = scores[j].TEAM_NAME;
    			nbaData[k].teamA.wins_losses = scores[j].TEAM_WINS_LOSSES;
    		}
    		if(nbaData[k].teamH.name === scores[j].TEAM_ABBREVIATION){
    			nbaData[k].teamH.label = scores[j].TEAM_NAME;
    			nbaData[k].teamH.wins_losses = scores[j].TEAM_WINS_LOSSES;
    		}
    	};
    };

    self.setState({
      nbaData: nbaData
    });

}