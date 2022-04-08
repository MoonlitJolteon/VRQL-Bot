import { CommandInteraction, GuildMember, MessageEmbed } from "discord.js";
import { bot, Team } from '../../index';

module.exports = {
    //Command metadata
    type: "slash",
    name: "create-team",
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
        const player = bot.players.get(interaction.user.id);
        if (!player) {
            interaction.editReply("You must set up your player profile first");
            return setTimeout(() => interaction.deleteReply(), 3000);
        }

        let teamNames = [];
        for (let team of allTeams) {
            teamNames.push(team[1].teamName);
        }

        if (!teamNames.includes(teamName)) {
            if (player.teamID == '') {
                await interaction.editReply(`Creating ${teamName}`);
                const teamID = teamName;

                player.teamID = teamID;
                player.teamPosition = "Captain";

                const teamObj: Team = {
                    teamID,
                    teamName,
                    players: [
                        player
                    ],
                    wins: 0,
                    losses: 0,
                    matches: [],
                    mmr: 1100
                }

                bot.teams.set(teamID, teamObj);
                bot.players.set(interaction.user.id, player);
            } else {
                await interaction.editReply(`You're already on a team!`);
            }
        } else {
            await interaction.editReply(`${teamName} Already Exists`);
        }

        setTimeout(() => interaction.deleteReply(), 3000);
    }
} 