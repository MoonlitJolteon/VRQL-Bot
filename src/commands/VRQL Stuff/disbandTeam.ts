import { CommandInteraction, GuildMember, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { MessageButtonStyles } from "discord.js/typings/enums";
import { bot, Team } from '../../index';

module.exports = {
    //Command metadata
    type: "slash",
    name: "disband-team",
    description: "Disband your team",
    options: [],

    //Main execution function, this is where you should put command logic
    async execute({ interaction }: { interaction: CommandInteraction }) {
        await interaction.deferReply();
        const player = bot.players.get(interaction.user.id);
        if(!player) {
            await interaction.editReply("You can't disband your team if you aren't even a player!");
            return setTimeout(() => interaction.deleteReply(), 3000);
        }
        const team = bot.teams.get(player.teamID);
        if(!team) {
            await interaction.editReply("You can't disband your team if you aren't on a team!");
            return setTimeout(() => interaction.deleteReply(), 3000);
        }
        if(player.teamPosition != "Captain") {
            await interaction.editReply("You can't disband your team if you aren't the captain.");
            return setTimeout(() => interaction.deleteReply(), 3000);
        }

        const confirm = new MessageButton().setCustomId("confirmDisband").setLabel("Press here to disband").setStyle(MessageButtonStyles.DANGER);
        const cancel = new MessageButton().setCustomId("cancelDisband").setLabel("Press here to cancel").setStyle(MessageButtonStyles.SUCCESS);
        const row = new MessageActionRow().addComponents(confirm, cancel);
        await interaction.editReply({content: "Are you sure?", components: [row]});
    }
} 