import React, { Component } from 'react';
import ArrowKeysReact from 'arrow-keys-react';
import './css/App.css';
import Clock from 'react-live-clock';
import axios from 'axios';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      playNoise: false,
      linkSelection: 0,
      links: [
        {
          id: 0,
          name: 'Reddit',
          url: 'http://reddit.com',
          icon: 'reddit.svg'
        },
        {
          id: 1,
          name: 'Youtube',
          url: 'http://youtube.com',
          icon: 'youtube.svg'
        },
        {
          id: 2,
          name: 'Liveleak',
          url: 'http://Liveleak.com',
          icon: 'liveleak.svg'
        }
      ],
      nbaData: null
    };
    ArrowKeysReact.config({
      left: () => {
        this.setState({
          linkSelection: this.changeLink('LEFT')
        });
      },
      right: () => {
        this.setState({
          linkSelection: this.changeLink('RIGHT')
        });
      }
    });

    this.handleEnterPress = this.handleEnterPress.bind(this);
    this.hoverHandle = this.hoverHandle.bind(this);
  }

  isActiveLink(id){
    return id === this.state.linkSelection;
  }

  changeLink(dir){

    let newSelection = this.state.linkSelection;

    if(dir === 'LEFT'){
      if(newSelection !== 0){
        newSelection--;
        this.setState({playNoise: true});
      }
    } else if (dir === 'RIGHT'){
      if(newSelection !== (this.state.links.length-1)){
        newSelection++;
        this.setState({playNoise: true});
      }
    }

    return newSelection;
  }

  handleEnterPress(event) {
    if(event.charCode === 13) {
      event.preventDefault();
      event.stopPropagation();

      for (var i = this.state.links.length - 1; i >= 0; i--) {
        if(this.state.links[i].id === this.state.linkSelection){
          window.open(this.state.links[i].url);
        }
      };
    }
  }

  hoverHandle(id,e){
    this.setState({
      linkSelection: id,
      playNoise: true
    });
  }

  setLinkAndNavigate(id,e){
    this.setState({
      linkSelection: id,
      playNoise: true
    });

    for (var j = this.state.links.length - 1; j >= 0; j--) {
      if(this.state.links[j].id === this.state.linkSelection){
        window.open(this.state.links[j].url);
      }
    };
  }

  processNBAData(scores, data){

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

      game.teamA.imgSrc = 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/' + game.teamA.name + '.png';
      game.teamH.imgSrc = 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/' + game.teamH.name + '.png';

      nbaData.push(game);
    };

    for (var j = scores.length - 1; j >= 0; j--) {
      console.log(scores[j]);
    };

    this.setState({
      nbaData: nbaData
    });
  }

  getNBAData(){
    let proxy = 'https://cors-anywhere.herokuapp.com/';
    let url = 'http://stats.nba.com/scores/' + Date.now().toLocaleString();

    axios.get(proxy + url)
      .then(res => {
        var string = res.data;

        var lineScore_variable = "window.nbaStatsLineScore = ";
        var gameInfo_variable = "window.nbaStatsGameInfo = ";
        var secondvariable = ";";

        var lineScore = JSON.parse(string.match(new RegExp(lineScore_variable + "(.*)" + secondvariable))[1]);
        var gameInfo = JSON.parse(string.match(new RegExp(gameInfo_variable + "(.*)" + secondvariable))[1]);

        this.processNBAData(lineScore, gameInfo);
    });
  }

  componentDidMount() {
    this.getNBAData();
  }

  render() {
    return (
      <div className="App">
      <main>
        <Clock className="timeDisplay" format={'h:mm a'} ticking={true} timezone={'US/Eastern'} />

        {this.state.nbaData ? (
          <div className="nbaContainers">
            {this.state.nbaData.map((item, index) => (
              <div className="nbaGame" key={index}>
                <div className="team">
                  <img src={item.teamA.imgSrc} alt="teamIcon"/>
                  <span>{item.teamA.name}</span>
                </div>
                <div className="team">
                  <img src={item.teamH.imgSrc} alt="teamIcon"/>
                  <span>{item.teamH.name}</span>
                </div>
              </div>
            ))}
          </div>
        ) : 
          <div className="nbaContainers">
            <h1>Loading</h1>
          </div>
        }

      </main>
        <div className="linkSection" ref={input => input && input.focus()} {...ArrowKeysReact.events} tabIndex="1" onKeyPress={this.handleEnterPress}>
          {this.state.links.map((item, index) => (
            <div className={"linkItem " + (this.isActiveLink(item.id) ? 'active' : null)} 
                key={index} 
                onMouseOver={(e) => this.hoverHandle(item.id, e)}
                onClick={(e) => this.setLinkAndNavigate(item.id, e)}>
                <div className="circleContainer">
                  <img src={process.env.PUBLIC_URL + '/icons/' + item.icon} alt="icon"/>
                </div>
                <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
