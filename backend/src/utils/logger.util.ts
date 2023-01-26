import {MessageEmbed, WebhookClient} from "discord.js";
import {webhooks} from "../Discord/enum.discord";

export async function errorLogger(message: string): Promise<void> {
    try {
        if (process.env.NODE_ENV == "development") {
            console.log(message)
        } else {
            const embed: MessageEmbed = new MessageEmbed()
                .setTitle('ERROR')
                .setDescription(message)
            const client: WebhookClient = new WebhookClient({url: webhooks.ERROR});
            await client.send({embeds: [embed]})
        }
    } catch (e) {
        throw  e
    }
}

export async function infoLogger(message: string): Promise<void> {
    try {
        if (process.env.NODE_ENV != "development") {
            const embed: MessageEmbed = new MessageEmbed()
                .setTitle('REQUEST')
                .setDescription(message)
            const client: WebhookClient = new WebhookClient({url: webhooks.REQUEST});
            await client.send({embeds: [embed]})
        }
    } catch (e) {
        throw  e
    }
}
