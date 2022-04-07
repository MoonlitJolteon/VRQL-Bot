import * as Slasho from 'discord-slasho';
import { TextChannel } from 'discord.js';
import * as dotenv from 'dotenv';
import Enmap from 'enmap';
dotenv.config();

export interface player {
    discordID: string
    oculusName: string
    teamID: string
    teamPosition: string
}

export interface matchScores {
    round1: { home: number, away: number, forfeit: boolean }
    round2: { home: number, away: number, forfeit: boolean }
    round3: { home: number, away: number, played: boolean, forfeit: boolean }
    summary: { home: number, away: number, homeWon: boolean}
}

export interface match {
    matchID: number
    homeTeam: team
    awayTeam: team
    scores: matchScores
}

export interface team {
    teamID: string
    teamName: string
    players: player[]
    wins: number
    losses: number
    matches: match[],
    mmr: number
}

export class customApp extends Slasho.App<any> {
    teams: Enmap<string, team>
    players: Enmap<string, player>
    constructor(options: Slasho.Config, state: any) {
        super(options, state);
        this.teams = new Enmap('teams');
        this.players = new Enmap('players');
    }
}

export const bot = new customApp({
    token: process.env.TOKEN!,
    devGuild: process.env.DEV_GUILD_ID || '',
    intents: ["GUILDS"],
    commandsDir: __dirname.replace("\\", "/") + "/commands",
    eventsDir: __dirname.replace("\\", "/") + "/events"
}, {});

bot.launch().then(async () => {
    // bot.dev();
    // bot.production();
    bot.client.user!.setPresence({ activities: [{ type: 'COMPETING', name: 'VRQL with /help' }], status: 'online' });
    const devGuild = await bot.client.guilds.fetch(process.env.DEV_GUILD_ID || '');
    const devChannel = await devGuild.channels.fetch(process.env.DEV_CHANNEL_ID || '') as TextChannel;
    // devChannel!.send(`Successfully initialized. Ready to serve ${bot.client.guilds.cache.size} guilds.`);
});