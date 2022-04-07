import { ButtonInteraction, Client, GuildMember, Interaction, Message, User } from "discord.js";

async function handleRoles(client: Client, event: Interaction) {
    const button = event as ButtonInteraction;
    const member = (button.member as GuildMember)
    const roleIDs: string[] = [];
    const roles = member.roles.cache;
    var currRole;
    roles.forEach(role => roleIDs.push(role.id));
    switch (button.customId) {
        case "transRole":
            currRole = '960967932744183808'
            if (roleIDs.includes(currRole)) {
                member.roles.remove(currRole);
                await button.reply(`Removed Trans role from ${member.displayName}`);
            } else {
                member.roles.add(currRole);
                await button.reply(`Given Role role to ${member.displayName}`);
            }
            break;
        case "fluidRole":
            currRole = '960968753544327168'
            if (roleIDs.includes(currRole)) {
                member.roles.remove(currRole);
                await button.reply(`Removed Genderfluid role from ${member.displayName}`);
            } else {
                member.roles.add(currRole);
                await button.reply(`Given Genderfluid role to ${member.displayName}`);
            }
            break;
        case "agenderRole":
            currRole = '960969854591041558'
            if (roleIDs.includes(currRole)) {
                member.roles.remove(currRole);
                await button.reply(`Removed Agender role from ${member.displayName}`);
            } else {
                member.roles.add(currRole);
                await button.reply(`Given Agender role to ${member.displayName}`);
            }
            break;
        case "nonbinaryRole":
            currRole = '960967251924754432'
            if (roleIDs.includes(currRole)) {
                member.roles.remove(currRole);
                await button.reply(`Removed Non-Binary role from ${member.displayName}`);
            } else {
                member.roles.add(currRole);
                await button.reply(`Given Non-Binary role to ${member.displayName}`);
            }
            break;

        case "hehimRole":
            currRole = '960967687364820993'
            if (roleIDs.includes(currRole)) {
                member.roles.remove(currRole);
                await button.reply(`Removed He/Him role from ${member.displayName}`);
            } else {
                member.roles.add(currRole);
                await button.reply(`Given He/Him role to ${member.displayName}`);
            }
            break;
        case "sheherRole":
            currRole = '960967729077178368'
            if (roleIDs.includes(currRole)) {
                member.roles.remove(currRole);
                await button.reply(`Removed She/Her role from ${member.displayName}`);
            } else {
                member.roles.add(currRole);
                await button.reply(`Given She/Her role to ${member.displayName}`);
            }
            break;
        case "theythemRole":
            currRole = '960967765496307784'
            if (roleIDs.includes(currRole)) {
                member.roles.remove(currRole);
                await button.reply(`Removed They/Them role from ${member.displayName}`);
            } else {
                member.roles.add(currRole);
                await button.reply(`Given The/Them role to ${member.displayName}`);
            }
            break;
        case "ititsRole":
            currRole = '961150073230721036'
            if (roleIDs.includes(currRole)) {
                member.roles.remove(currRole);
                await button.reply(`Removed It/Its role from ${member.displayName}`);
            } else {
                member.roles.add(currRole);
                await button.reply(`Given It/Its role to ${member.displayName}`);
            }
            break;

        case "gayRole":
            currRole = '960967166260314193'
            if (roleIDs.includes(currRole)) {
                member.roles.remove(currRole);
                await button.reply(`Removed Gay role from ${member.displayName}`);
            } else {
                member.roles.add(currRole);
                await button.reply(`Given Gay role to ${member.displayName}`);
            }
            break;
        case "biRole":
            currRole = '960967218676518993'
            if (roleIDs.includes(currRole)) {
                member.roles.remove(currRole);
                await button.reply(`Removed Bi role from ${member.displayName}`);
            } else {
                member.roles.add(currRole);
                await button.reply(`Given Bi role to ${member.displayName}`);
            }
            break;
        case "lesbianRole":
            currRole = '960969171267641366'
            if (roleIDs.includes(currRole)) {
                member.roles.remove(currRole);
                await button.reply(`Removed Lesbian role from ${member.displayName}`);
            } else {
                member.roles.add(currRole);
                await button.reply(`Given Lesbian role to ${member.displayName}`);
            }
            break;
        case "panRole":
            currRole = '960967608574816276'
            if (roleIDs.includes(currRole)) {
                member.roles.remove(currRole);
                await button.reply(`Removed Pan role from ${member.displayName}`);
            } else {
                member.roles.add(currRole);
                await button.reply(`Given Pan role to ${member.displayName}`);
            }
            break;
        case "aceRole":
            currRole = '960968313037533214'
            if (roleIDs.includes(currRole)) {
                member.roles.remove(currRole);
                await button.reply(`Removed Ace role from ${member.displayName}`);
            } else {
                member.roles.add(currRole);
                await button.reply(`Given Ace role to ${member.displayName}`);
            }
            break;
        case "aroaceRole":
            currRole = '960969808470503445'
            if (roleIDs.includes(currRole)) {
                member.roles.remove(currRole);
                await button.reply(`Removed Aro Ace role from ${member.displayName}`);
            } else {
                member.roles.add(currRole);
                await button.reply(`Given Aro Ace role to ${member.displayName}`);
            }
            break;
        case "aroRole":
            currRole = '960969230642200627'
            if (roleIDs.includes(currRole)) {
                member.roles.remove(currRole);
                await button.reply(`Removed Aromantic role from ${member.displayName}`);
            } else {
                member.roles.add(currRole);
                await button.reply(`Given Aromantic role to ${member.displayName}`);
            }
            break;

        case "playerRole":
            currRole = '960966900534353950'
            if (roleIDs.includes(currRole)) {
                member.roles.remove(currRole);
                await button.reply(`Removed player role from ${member.displayName}`);
            } else {
                member.roles.add(currRole);
                await button.reply(`Given player role to ${member.displayName}`);
            }
            break;
        case "subRole":
            currRole = '961392778535911444'
            if (roleIDs.includes(currRole)) {
                member.roles.remove(currRole);
                await button.reply(`Removed Substitute role from ${member.displayName}`);
            } else {
                member.roles.add(currRole);
                await button.reply(`Given Substitute role to ${member.displayName}`);
            }
            break;
        default:
            await button.reply(`Unknown button ${button.customId}`);
    }

    setTimeout(() => {
        button.deleteReply();
    }, 1000);
}

module.exports = {
    event: "interactionCreate",
    async execute({ client, event }: { client: Client, event: Interaction }) {
        if (event.isCommand())
            return;

        if (event.isSelectMenu()) {
            return;
        }

        if (event.isButton()) {
            const button = event as ButtonInteraction
            if (button.customId.includes("Role"))
                handleRoles(client, event)
        }

    }

}