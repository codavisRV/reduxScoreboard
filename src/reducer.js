export default (state = {}, action) => {
    switch (action.type) {
        case 'STORE_YARDAGE' :
            return {
                ...state,
                curYardage: action.text
            };
        
        case 'SUBMIT_DRIVE' : 
            let newState = Object.assign({}, state);
            console.log(newState.scores[newState.curTeam]);
            newState.scores[newState.curTeam] += action.increment;
            newState.curTeam = newState.curTeam === "Panthers" ? "Falcons" : "Panthers";
            newState.playByPlay.push(action.driveSummary);
            newState.curDrive++;
            return {
                ...state,
                scores: newState.scores,
                curYardage: "",
                curTeam: newState.curTeam,
                playByPlay: newState.playByPlay,
                curDrive: newState.curDrive

            }
        default: 
            return state;
    }
}