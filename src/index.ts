import * as Slasho from 'discord-slasho';
import { TextChannel } from 'discord.js';
import * as dotenv from 'dotenv';
import Enmap from 'enmap';
dotenv.config();

export class customApp extends Slasho.App<any> {
    constructor(options: Slasho.Config, state: any) {
        super(options, state);
    }
}

export const bot = new customApp( {
    token: process.env.TOKEN!,
    devGuild: process.env.DEV_ID || '',
    intents: ["GUILDS"],
    commandsDir: __dirname.replace("\\", "/") + "/commands",
    eventsDir: __dirname.replace("\\", "/") + "/events"
}, {});

bot.launch().then(async () => {
    // bot.dev();c
    // bot.production();
    bot.client.user!.setPresence({ activities: [{type: 'COMPETING', name: 'VRQL with /help' }], status: 'online' });
    // const devGuild = await bot.client.guilds.fetch('757624148800569506');
    // const devChannel = await devGuild.channels.fetch('879397449012244480') as TextChannel;
    // devChannel!.send(`Successfully initialized. Ready to serve ${bot.client.guilds.cache.size} guilds.`);
});