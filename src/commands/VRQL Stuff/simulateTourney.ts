import { CommandInteraction, GuildMember, MessageEmbed } from "discord.js";
import { bot } from '../../index';
import { simulate } from '../../utils/bracket';

module.exports = {
    //Command metadata
    type: "slash",
    name: "simulate-tourney",
    description: "Simulate a randomized tournament between all the current teams",
    options: [],

    //Main execution function, this is where you should put command logic
    async execute({ interaction }: { interaction: CommandInteraction }) {
        await interaction.deferReply({ephemeral: true});
        const allTeams = bot.teams.fetchEverything();

        const response = await simulate(allTeams.map((val, key) => key));
        await interaction.editReply(response);
        return;
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