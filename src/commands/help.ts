import { CommandInteraction, MessageEmbed } from "discord.js";

module.exports = {
    //Command metadata
    type: "slash",
    name: "help",
    description: "Information about the bot",
    options: [],

    //Main execution function, this is where you should put command logic
    async execute({ interaction }: { interaction: CommandInteraction }) {
        await interaction.deferReply({ephemeral: true});
        const embed = new MessageEmbed()
            .setAuthor({name: "Created by MoonlitJolteon", iconURL: 'https://cdn.discordapp.com/icons/757624148800569506/a_1a0bee00615783ef293ca179af37434c.webp', url: 'https://ko-fi.com/moonlitjolteon'})
            .setColor("#9E2CB2")
            .setTitle("What is VRQL?")
            .setDescription("VRQL Description Coming soon")
            .addField(
                "Not Command Stuff",
                "[Buy Moonlit a coffee!](https://ko-fi.com/moonlitjolteon)"
            );
            await interaction.editReply({ embeds: [embed] });

    }
} 