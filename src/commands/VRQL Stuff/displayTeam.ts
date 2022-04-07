import { CommandInteraction, GuildMember, MessageEmbed } from "discord.js";
import { bot, team } from '../../index';

module.exports = {
    //Command metadata
    type: "slash",
    name: "display-team",
    description: "Display a team",
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
        const team = bot.teams.get(teamName);
        if(!team) {
            await interaction.editReply(`${teamName} doesn't exist!`);
            return setTimeout(() => interaction.deleteReply(), 3000);
        }

        let embed = new MessageEmbed().setColor("GOLD")
            .setTitle(`Team Name`)
            .setDescription(team.teamName);

        let players = "";
        for(let player of team.players) {
            players += `\n${player.oculusName}: ${player.teamPosition}`
        }
        embed
            .addField(
                "Players:",
                players
            )
            .addField(
                "MMR:",
                `${team.mmr}\n(This won't actually change unless we switch to ladder based matches)`
            )
            .addField(
                "W/L:",
                `${team.wins}/${team.losses}`
            )
        await interaction.editReply({embeds: [embed]});
    }
} 