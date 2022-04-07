import { matchScores, team } from "../index";

function roundToTheHundredth(num: number): number {
    return Math.round(num * 100) / 100
}

export function updateMMR(homeTeam: team, awayTeam: team, scores: matchScores) {
    const homeRating = homeTeam.mmr;
    const awayRating = awayTeam.mmr;

    const expectedHomeResult = roundToTheHundredth(1 / (1+10 ** ((awayRating - homeRating) / 400)));
    const expectedAwayResult = roundToTheHundredth(1 / (1+10 ** ((homeRating - awayRating) / 400)));

    const newHomeRating = Math.round(homeRating + (20 * (scores.summary.homeWon ? 1 : 0) - expectedHomeResult))
    const newAwayRating = Math.round(awayRating + (20 * (scores.summary.homeWon ? 0 : 1) - expectedAwayResult))

    homeTeam.mmr = newHomeRating;
    awayTeam.mmr = newAwayRating;

    return {
        newHome: homeTeam,
        newAway: awayTeam
    }
}