import { CommandInteraction, Guild, GuildMember, MessageEmbed } from "discord.js";
import { bot } from '../../index';

module.exports = {
    //Command metadata
    type: "slash",
    name: "player-info",
    description: "Get Player Info",
    options: [
        {
            name: "player",
            description: "User to get info",
            type: "USER",
            required: true
        }
    ],

    //Main execution function, this is where you should put command logic
    async execute({ interaction }: { interaction: CommandInteraction }) {
        await interaction.deferReply();
        const member = interaction.options.getMember('player') as GuildMember;
        const player = bot.players.get(member.id);
        if(!player) {
            await interaction.editReply(`${member.displayName} hasn't set up their player profile yet`);
            return setTimeout(() => interaction.deleteReply(), 3000);
        }
        const team = bot.teams.get(player!.teamID);
        let playerInfo = "";
        if(team) playerInfo += `Team: ${team.teamName}`
        playerInfo += `Team Position: ${player.teamPosition}`

        const embed = new MessageEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setTitle(player.oculusName)
            .setDescription(playerInfo);
        await interaction.editReply({embeds: [embed]});
    }
} 