interface BracketTeam {
    position: number
    opponentPos: number
    teamID: string
    won: boolean
    losersBracket: boolean
}

export function shuffleArray(arr: any[]): any[] {
    return arr.sort(() => Math.random() - 0.5);
}

export function generateBracket(teamIDs: string[]): BracketTeam[] {
    teamIDs = shuffleArray(teamIDs);
    let bracket: BracketTeam[] = [];
    if (teamIDs.length % 2 == 1)
        teamIDs.push("dummyTeam");

    for (let iStr in teamIDs) {
        const i = parseInt(iStr);
        let opponentPos = -1;
        opponentPos = i % 2 == 0 ? i + 1 : i - 1;
        let team: BracketTeam = {
            position: i,
            opponentPos,
            teamID: teamIDs[i],
            won: false,
            losersBracket: false
        }
        bracket.push(team);
    }
    return bracket;
}

export function findTeamIndex(bracket: BracketTeam[], position: number): number {
    let pos = -1
    const filtered = bracket.filter(team => team.position == position)
    if (filtered.length > 0) return bracket.indexOf(filtered[0])
    return pos;
}

export function assignNewOpponents(bracket: BracketTeam[], winners: BracketTeam[], losers: BracketTeam[]): BracketTeam[] {
    const numWinners = winners.length;
    const numLosers = losers.length;
    if (numWinners == 1 && numLosers == 1) {
        bracket[0].opponentPos = bracket[1].position
        bracket[1].opponentPos = bracket[0].position
        return bracket;
    }

    for (let iStr in winners) {
        const i = parseInt(iStr);
        const winner = winners[i];
        const winnerIndex = bracket.indexOf(winner);
        if (numLosers > numWinners) {
            bracket[winnerIndex].opponentPos = -1;
            continue
        }
        if (i + 1 == winners.length && i % 2 == 0) {
            bracket[winnerIndex].opponentPos = -1
            continue
        }

        bracket[winnerIndex].opponentPos = i % 2 == 0 ? winners[i + 1].position : winners[i - 1].position;
    }

    for (let iStr in losers) {
        const i = parseInt(iStr);
        const loser = losers[i];
        const loserIndex = bracket.indexOf(loser);
        if (i + 1 == losers.length && i % 2 == 0) {
            bracket[loserIndex].opponentPos = -1
            continue
        }

        bracket[loserIndex].opponentPos = i % 2 == 0 ? losers[i + 1].position : losers[i - 1].position;
    }
    return bracket;
}

export function iterateBracket(bracket: BracketTeam[]): BracketTeam[] {
    bracket = bracket.filter(team => !((!team.won) && team.losersBracket) || team.opponentPos == -1);
    let winners: BracketTeam[] = []
    let losers: BracketTeam[] = []
    for (let iStr in bracket) {
        const i = parseInt(iStr);
        const team = bracket[i];
        team.losersBracket = !team.won || team.losersBracket;
        if (!team.losersBracket && team.teamID != "dummyTeam") {
            winners.push(team)
        } else {
            losers.push(team)
        }
        bracket[i].won = false;
    }
    bracket = assignNewOpponents(bracket, winners, losers);
    return bracket
}

export function simulate(teams: string[]): string {
    console.log(teams)
    let mainBracket = generateBracket(teams);
    let i = 0;
    while (mainBracket.length > 1) {
        let j = 0;
        for (let team of mainBracket.filter(team => team.losersBracket)) {
            const teamIndex = findTeamIndex(mainBracket, team.position);
            mainBracket[teamIndex].won = j % 2 == 0;
            j++;
        }

        j = 0;
        for (let team of mainBracket.filter(team => !team.losersBracket)) {
            const teamIndex = findTeamIndex(mainBracket, team.position);
            mainBracket[teamIndex].won = j % 2 == 0;
            j++;
        }
        if(mainBracket.length == 2) {
            let winchance = Math.round(Math.random())
            let won = winchance < 0.5;
            mainBracket[0].won = won
            mainBracket[1].won = !won
        }
        mainBracket = iterateBracket(mainBracket);
        i++
    }
    // console.log("----------");
    return `The Winner is ${mainBracket[0].teamID}`;
}