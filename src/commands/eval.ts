import { CommandInteraction, MessageEmbed } from "discord.js";
const errorNoPermissions = new MessageEmbed().setColor("#FF0000").setTitle("Error").setDescription(`Sorry, only server admins can use this command (Jolt considers admins to be anyone with 'manage server' permissions.)`);

const clean = async (text: any) => {
    if (text && text.constructor.name == "Promise")
        text = await text;

    if (typeof text !== "string")
        text = require("util").inspect(text, { depth: 1 });

    text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
}

module.exports = {
    type: "slash",
    name: "eval",
    description: "Eval code",
    options: [
        {
            name: "command",
            description: "Command to run",
            type: "STRING",
            required: true
        }
    ],
    defaultPermission: true,

    async execute({ interaction }: { interaction: CommandInteraction }) {
        if (interaction.member?.user.id != '237360479624757249') return interaction.reply({ embeds: [errorNoPermissions], ephemeral: true });
        await interaction.deferReply({ ephemeral: true });
        try {
            const evaled = eval(interaction!.options!.getString('command') ?? "No command found...");
            interaction.editReply(await clean(evaled));
        } catch (e: any) {
            interaction.editReply(await clean(e));
        };
    }
}