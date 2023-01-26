import {
  Client, Intents, User,
  MessageOptions, DMChannel, Message, TextChannel, MessageEmbed, WebhookClient, Webhook
} from 'discord.js';
import { channels, webhooks } from './enum.discord';


class methods {

  constructor(private client: Client) { }

  sendLog(message: MessageOptions, channel: channels): Promise<Message | Message[]> {
    return new Promise(async (resolve, reject) => {
      try {

        const channel_ = await this.client.channels.fetch(channel) as TextChannel
        // // console.log(channel_)
        if (!channel_) {
          //   // //    this.destroy()
          throw new Error('Channel not found')
        }



        const result = await channel_.send(message)
        resolve(result)
        //////  this.destroy()


      } catch (error: any) {
        console.log(error)
        reject(error)
      }
    });
  }



  findUser(user_id: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        // //   await this.run()
        const user = await this.client.users.fetch(user_id)
        resolve(user);
        //  this.destroy()
      } catch (error) {
        reject(error)
      }
    });
  }

  send(user: User, message: MessageOptions): Promise<Message | Message[]>
  send(user: string, message: MessageOptions): Promise<Message | Message[]>
  send(user: string | User, message: MessageOptions): Promise<Message | Message[]> {
    return new Promise(async (resolve, reject) => {
      try {



        let dm: DMChannel;
        if (user instanceof User) {
          dm = await user.createDM()

        }
        else {
          const user_ = await this.findUser(user as string)
          //await user_.dmChannel?.send('Hello')


          dm = await user_.createDM()
        }
        // dm.delete()
        const result = await dm.send(message)
        resolve(result)
        //   this.destroy()
      } catch (error: any) {
        reject(error)
      }
    });
  };


}




export async function sendWEbhookEmbed(embed: MessageEmbed, webhookKey: string): Promise<void>;

export async function sendWEbhookEmbed(embed: MessageEmbed, webhookKey: keyof typeof webhooks): Promise<void>;

export async function sendWEbhookEmbed(embed: MessageEmbed, webhookKey: string | keyof typeof webhooks): Promise<void> {

  try {
    const value = webhooks[webhookKey as keyof typeof webhooks];
    if (value) {
      await _send({ embeds: [embed] }, value);
    } else {
      await _send({ embeds: [embed] }, webhookKey);
    }

  } catch (error: any) {
  }

}
async function _send(message: MessageOptions, webhookUrl: string) {
  try {
    const client = new WebhookClient({
      url: webhookUrl,

    });

    await client.send({
      username: 'IRWorld Logs',
      ...message
    });
  } catch (error) {
    throw error;
  }
}


export default methods;