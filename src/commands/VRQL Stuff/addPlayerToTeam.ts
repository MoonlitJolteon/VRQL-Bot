import { CommandInteraction, GuildMember, MessageEmbed } from "discord.js";
import { bot } from '../../index';

module.exports = {
    //Command metadata
    type: "slash",
    name: "add-player-to-team",
    description: "Add a player to your team",
    options: [
        {
            name: "player",
            description: "Player",
            type: "USER",
            required: true
        }
    ],

    //Main execution function, this is where you should put command logic
    async execute({ interaction }: { interaction: CommandInteraction }) {
        await interaction.deferReply();
        const player = bot.players.get(interaction.user.id);
        if (!player || player.teamPosition != "Captain") {
            await interaction.editReply(`You can't add someone to your team if you're not the captain of a team.`);
        } else {
            const user = interaction.options.getMember('player') as GuildMember;
            const otherPlayer = bot.players.get(user.id);
            if (otherPlayer) {
                const team = bot.teams.get(player.teamID);
                if(!team) {
                    await interaction.editReply(`The team doesn't exist`);
                } else if (team.players.length >= 4) {
                    await interaction.editReply(`${team.teamName} has already hit it's max number of players!`);
                } else if (otherPlayer.teamID != '') {
                    await interaction.editReply(`${user.displayName} already has a team!`);
                } else {
                    otherPlayer!.teamID = player.teamID;
                    otherPlayer!.teamPosition = "Player";
                    bot.players.set(user.id, otherPlayer);
                    team.players.push(otherPlayer);
                    bot.teams.set(team.teamID, team);
                }
            } else await interaction.editReply(`${user.displayName} hasn't set up their profile!`);
        }

        setTimeout(() => interaction.deleteReply(), 3000);
    }
} 