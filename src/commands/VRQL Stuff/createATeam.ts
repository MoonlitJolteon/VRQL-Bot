import { CommandInteraction, MessageEmbed } from "discord.js";
import { bot, team } from '../../index';

module.exports = {
    //Command metadata
    type: "slash",
    name: "team-test",
    description: "Create a team",
    options: [
        {
            name: "teamname",
            description: "Team Name",
            type: "STRING",
            required: true
        }
    ],

    //Main execution function, this is where you should put command logic
    async execute({ interaction }: { interaction: CommandInteraction }) {
        await interaction.deferReply();
        const teamName = interaction.options.getString("teamname")!;
        const allTeams = bot.teams.fetchEverything();
        let teamNames = [];
        for(let team of allTeams) {
            teamNames.push(team[1].teamName);
        }

        if(!teamNames.includes(teamName)) {
            await interaction.editReply(`Creating ${teamName}`);
            bot.teams.set(teamName, {
                teamID: teamName,
                teamName: teamName
            } as team);
        } else {
            await interaction.editReply(`Hello ${teamName}`);
        }

        setTimeout(() => interaction.deleteReply(), 500);
    }
} 