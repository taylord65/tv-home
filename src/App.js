import React, { Component } from 'react';
import ArrowKeysReact from 'arrow-keys-react';
import './css/App.css';
import Clock from 'react-live-clock';
import axios from 'axios';
import processNBAData from './helpers/processNBAData';
import getGentiStreams from './helpers/getGentiStreams';
import getTeamNameFromLabel from './helpers/getTeamNameFromLabel';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      playNoise: false,
      linkSelection: 0,
      gameSelection: 0,
      gameSelectionMode: false,
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
        },
        {
          id: 3,
          name: 'Google Maps',
          url: 'http://www.google.ca/maps',
          icon: 'navigation.svg'
        }
      ],
      nbaData: null
    };
    ArrowKeysReact.config({
      left: () => {

        if(this.state.gameSelectionMode){
          this.setState({
            gameSelection: this.changeGame('LEFT')
          });
        } else {
          this.setState({
            linkSelection: this.changeLink('LEFT')
          });
        }
      },
      right: () => {

        if(this.state.gameSelectionMode){
          this.setState({
            gameSelection: this.changeGame('RIGHT')
          });
        } else {
          this.setState({
            linkSelection: this.changeLink('RIGHT')
          });
        }
      },
      up: () => {
        this.setState({
          gameSelectionMode: true
        });
      },
      down: () => {
        this.setState({
          gameSelectionMode: false
        });
      }
    });

    this.handleEnterPress = this.handleEnterPress.bind(this);
    this.hoverHandle = this.hoverHandle.bind(this);
  }

  isActiveLink(id){
    //When not in game selection mode, highlight the active link
    if(!this.state.gameSelectionMode){
      return id === this.state.linkSelection;
    }
  }

  isActiveGame(index){
    //In game selection mode highlight the active game.
    if(this.state.gameSelectionMode){
      return index === this.state.gameSelection;
    }
  }

  changeGame(dir){

    let newSelection = this.state.gameSelection;

    let view = document.getElementById("gamesView");

    let scrollAmount = 396;
   
    if(dir === 'LEFT'){
      if(newSelection !== 0){
        newSelection--;
        view.scrollLeft -= scrollAmount;
      }
    } else if (dir === 'RIGHT'){
      if(newSelection !== (this.state.nbaData.length-1)){
        newSelection++;
        view.scrollLeft += scrollAmount;
      }
    }
    return newSelection;
  }

  changeLink(dir){

    let newSelection = this.state.linkSelection;

    if(dir === 'LEFT'){
      if(newSelection !== 0){
        newSelection--;
      }
    } else if (dir === 'RIGHT'){
      if(newSelection !== (this.state.links.length-1)){
        newSelection++;
      }
    }

    return newSelection;
  }

  handleEnterPress(event) {
    if(event.charCode === 13) {

      event.preventDefault();
      event.stopPropagation();

      if(this.state.gameSelectionMode){
        for (var j = this.state.nbaData.length - 1; j >= 0; j--) {
          if(j === this.state.gameSelection){
            window.open(this.state.nbaData[j].link);            
          }
        };
      } else {
        for (var i = this.state.links.length - 1; i >= 0; i--) {
          if(this.state.links[i].id === this.state.linkSelection){
            window.open(this.state.links[i].url);
          }
        };
      }

    }
  }

  hoverHandle(id,e, game){
    if(game){
      this.setState({gameSelection: id, gameSelectionMode: true});
    } else {
      this.setState({linkSelection: id, gameSelectionMode: false});
    }
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

  componentDidMount() {
    let proxy = 'https://cors-anywhere.herokuapp.com/';
    let url = 'http://stats.nba.com/scores/';
    let streamsUrl = 'http://www.genti.stream/';

    axios.get(proxy + url)
      .then(res => {

        processNBAData(this, res);

        axios.get(proxy + streamsUrl)
          .then(res => {
            getGentiStreams(this,res, getTeamNameFromLabel);
        })
        .catch(function(error){
          console.log("Error getting stream posts");
        });
    })
    .catch(function (error) {
      console.log("Error getting game data");
    });
  }

  render() {
    return (
      <div className="App">
      <header>
        <Clock className="timeDisplay" format={'h:mm'} ticking={true} timezone={'US/Eastern'} />
{/*        <div className="screenSaver">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="768" height="768" viewBox="0 0 768 768">
            <path fill="#444444" d="M498 537l-34.5-130.5 105-87-135-7.5-49.5-126-49.5 126-136.5 7.5 106.5 87-34.5 130.5 114-73.5zM640.5 384c0 34.5 28.5 64.5 63 64.5v127.5c0 34.5-28.5 64.5-63 64.5h-513c-34.5 0-63-30-63-64.5v-127.5c36 0 63-30 63-64.5s-28.5-64.5-63-64.5v-127.5c0-34.5 28.5-64.5 63-64.5h513c34.5 0 63 30 63 64.5v127.5c-34.5 0-63 30-63 64.5z"></path>
          </svg>
          <span>Screensaver</span>
        </div>*/}
      </header>
      <main>
        {this.state.nbaData ? (
          <div className="nbaContainers" id="gamesView">
            {this.state.nbaData.map((item, index) => (
              <div className={"nbaGame " + (this.isActiveGame(index) ? 'activeGame' : null)} 
                  key={index}
                  onMouseOver={(e) => this.hoverHandle(index, e, true)} 
                  onClick={(e) => window.open(item.link)}>
                <div className="team">
                  <img src={item.teamA.imgSrc} alt="teamIcon"/>
                  <span>{item.teamA.label}</span>
                  <span className="wlRecord">{item.teamA.wins_losses}</span>
                </div>
                <div className="timeArea">
                  <span>{ item.time.replace(' ET', '') }</span>
                </div>
                <div className="team">
                  <img src={item.teamH.imgSrc} alt="teamIcon"/>
                  <span>{item.teamH.label}</span>
                  <span className="wlRecord">{item.teamH.wins_losses}</span>
                </div>
              </div>
            ))}
          </div>
        ) : 
          <div className="nbaContainers">
            <img id="loadingGif" src={process.env.PUBLIC_URL + '/loading.gif'} alt="loading"/>
          </div>
        }
      </main>
        <div className="linkSection" ref={input => input && input.focus()} {...ArrowKeysReact.events} tabIndex="1" onKeyPress={this.handleEnterPress}>
          {this.state.links.map((item, index) => (
            <div className={"linkItem " + (this.isActiveLink(item.id) ? 'active' : null)} 
                key={index} 
                onMouseOver={(e) => this.hoverHandle(item.id, e, false)}
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
