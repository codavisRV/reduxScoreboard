import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { storeYardage, submitDrive } from './actions';

class App extends Component {

  constructor() {
    super();
    this.handleStoreYardage = this.handleStoreYardage.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  // updates the state to reflect the yardage in the form box
  handleStoreYardage(e) {
    this.props.dispatch(storeYardage(e.target.value));
  }

  handleButtonClick(e) {
    e.preventDefault();
    if (this.props.curYardage !== "") {
      let outcome = e.target.innerHTML;
      let driveSummary = {
        team: this.props.curTeam,
        drive: this.props.curDrive,
        yardage: this.props.curYardage,
        outcome: outcome
      }
      
      switch(outcome) {
        //update curTeam, set yardage and outcome to the drive summary, 
        case "Field Goal" :
          return this.props.dispatch(submitDrive(driveSummary, 3));
        case "Touchdown" :
          return this.props.dispatch(submitDrive(driveSummary, 7));
        default  : 
          return this.props.dispatch(submitDrive(driveSummary, 0));
      }
    }
  }

  
  render() {
    let gameState = this.props;
    let drives = gameState.playByPlay.map((drive) => {
      return <li key={drive.drive}><strong>Drive {drive.drive}</strong> The {drive.team} drove for {drive.yardage} yards. {drive.outcome}. </li>
      
    }, this);

    return (
      <div className="App">
        <h1>Football game tracker</h1>
        <div className="score-block">
          <p className="team-name">Panthers</p>
          <p className="score">{gameState.scores.Panthers}</p>
        </div>
        <div className="score-block">
          <p className="team-name">Falcons</p>
          <p className="score">{gameState.scores.Falcons}</p>
        </div>
        <div className="play-by-play">
          <h2>Drive Summary</h2>
          <ul>
            {drives}
          </ul>
        </div>
        <div className="active-team">
          <h2>The {gameState.curTeam} have the ball!</h2>
        </div>
        <div className="control-game">
          <h3>Drive outcome</h3>
          <form className="drive-yardage">
            <label htmlFor="yardage">Yards this drive: </label>
            <input type="number" name="yardage" id="yardage" placeholder="Enter drive yardage" onChange={this.handleStoreYardage} value={gameState.curYardage}/>
            <button onClick={this.handleButtonClick}>Turnover</button>
            <button onClick={this.handleButtonClick}>Field Goal</button>
            <button onClick={this.handleButtonClick}>Touchdown</button>
          </form>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  scores: state.scores,
  curTeam: state.curTeam,
  playByPlay: state.playByPlay,
  curYardage: state.curYardage,
  curDrive: state.curDrive
})

export default connect(mapStateToProps)(App);
