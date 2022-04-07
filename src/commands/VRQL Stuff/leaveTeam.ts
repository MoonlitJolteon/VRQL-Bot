import { CommandInteraction, GuildMember, MessageEmbed } from "discord.js";
import { bot, team } from '../../index';

module.exports = {
    //Command metadata
    type: "slash",
    name: "leave-team",
    description: "Create a team",
    options: [],

    //Main execution function, this is where you should put command logic
    async execute({ interaction }: { interaction: CommandInteraction }) {
        await interaction.deferReply();
        const player = bot.players.get(interaction.user.id);
        if (!player) {
            interaction.editReply("You can't leave a team if you aren't a player!");
            return setTimeout(() => interaction.deleteReply(), 3000);
        }
        if (player.teamID != '') {
            if(player.teamPosition == "Captain") {
                await interaction.editReply("You can't leave if you're the captain! Disband instead!");
                return  setTimeout(() => interaction.deleteReply(), 3000);
            }
            const team = bot.teams.get(player.teamID)!;

            player.teamID = "";
            player.teamPosition = "No Team";

            team.players = team.players.filter(player => player.discordID != interaction.user.id);

            bot.teams.set(team.teamID, team);
            bot.players.set(interaction.user.id, player);
            interaction.editReply(`Left ${team.teamName}`);
        }
        setTimeout(() => interaction.deleteReply(), 3000);
    }
} 