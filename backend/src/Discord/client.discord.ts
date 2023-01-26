// import { Client, Intents, User, MessageOptions, DMChannel, Message, TextChannel, MessageEmbed } from 'discord.js';

// const client: Client = new Client({
//   //disableMentions: 'everyone',
//   //  partials: ['USER', 'CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION'],

// })

// import loggerUtil from '../utils/logger.util';
// const logger = loggerUtil()
// class Bot {

//   static async run(): Promise<Client> {
//     try {


//       // if (typeof client.user?.id == 'string') {
//       //   return client;
//       // }

//       await client.login(process.env.BOT_TOKEN);

//       logger.info('Bot is running')
//       return client;
//     } catch (error: any) {

//       logger.error(error?.stack || "")
//       throw new Error(error);
//     }
//   }

//   static destroy(): void {
//     try {

//       // if (client.user == null) {

//       //   return;
//       // }

//       client.destroy()
//       logger.info('Bot is destroyed')
//     } catch (error: any) {
//       logger.error(error?.stack || "Bot Destroy Error")
//     }
//   }


// }


// export default Bot;