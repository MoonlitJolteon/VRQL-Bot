import { CommandInteraction, GuildMember, MessageEmbed } from "discord.js";
import { bot, player } from '../../index';

module.exports = {
    //Command metadata
    type: "slash",
    name: "setup-profile",
    description: "Create a team",
    options: [
        {
            name: "playername",
            description: "Oculus Player Name",
            type: "STRING",
            required: true
        }
    ],

    //Main execution function, this is where you should put command logic
    async execute({ interaction }: { interaction: CommandInteraction }) {
        await interaction.deferReply();
        const playerName = interaction.options.getString("playername")!;
        const player = bot.players.get(interaction.user.id);

        if (!player) {
            const playerObj: player = {
                discordID: interaction.user.id,
                oculusName: playerName,
                teamID: "",
                teamPosition: "No Team"
            }
            bot.players.set(interaction.user.id, playerObj);
        } else {
            await interaction.editReply(`${playerName} Already Exists`);
        }

        setTimeout(() => interaction.deleteReply(), 500);
    }
} 