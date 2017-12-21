export default function processNBAData(self, scores, data) {
    var nbaData = [];

    for (var i = data.length - 1; i >= 0; i--) {

      console.log(data[i]);

      let game = {
        teamA: {
          name: null,
          imgSrc: null
        },
        teamH: {
          name: null,
          imgSrc: null
        }
      };

      let snippet = data[i].GAMECODE.split('/');

      let teamsSnippet = snippet[1];

      game.teamA.name = teamsSnippet.substring(0,3);
      game.teamH.name = teamsSnippet.substring(3,6);

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

      game.teamA.imgSrc = 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/' + game.teamA.name + '.png';
      game.teamH.imgSrc = 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/' + game.teamH.name + '.png';

      nbaData.push(game);
    };

    for (var j = scores.length - 1; j >= 0; j--) {
      console.log(scores[j]);
    };

    self.setState({
      nbaData: nbaData
    });
}