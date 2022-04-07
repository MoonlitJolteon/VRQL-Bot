import { CommandInteraction, GuildMember, MessageEmbed } from "discord.js";
import { bot, team } from '../../index';

module.exports = {
    //Command metadata
    type: "slash",
    name: "list-teams",
    description: "List team names",
    options: [],

    //Main execution function, this is where you should put command logic
    async execute({ interaction }: { interaction: CommandInteraction }) {
        await interaction.deferReply();
        const allTeams = bot.teams.fetchEverything();
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("All Teams");
        let teams = '';
        for (let team of allTeams) {
            teams += `\n${team[1].teamName}`
        }
        embed.setDescription(teams);
        await interaction.editReply({embeds: [embed]});
    }
} 