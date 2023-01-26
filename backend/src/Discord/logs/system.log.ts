// import {MessageEmbed} from "discord.js"
// import {Request} from "express"
// import moment from "moment"
// import {PaymentStatus, PaymentType} from "../../enums/paymnet.enum"
// import {ICharacter} from "../../interfaces/Character.interface"
// import {User} from "../../interfaces/User.interface"
// import paymentModel from "../../models/payment.model"
// import userModel from "../../models/User.model"
// import {sendWEbhookEmbed} from "../methods.discord"
//
//
// export class SystemLogs {
//
//
//     static async everyDay() {
//         //* this code run in every day at 00:00:00
//         // how get Date yesterday
//
//
//         try {
//
//
//             let payments = await paymentModel.find({
//                 createdAt: {
//                     $gte: moment().subtract(1, 'days').toDate(),
//                     $lte: moment().toDate()
//                 }
//             })
//             //!
//             let userDashboard = await userModel.find({
//                 createdAt: {
//                     $gte: moment().subtract(1, 'days').toDate(),
//                     $lte: moment().toDate()
//
//                 }
//             }).countDocuments()
//
//             /**
//              gifts Schema:
//              lastGift: {
//                       type: Date,
//                       required: true,
//                       default: new Date(0),
//                   }
//
//              */
//                 // just today
//             let usersUsGifts = await userModel.find({
//                     gifts: { // array
//                         $elemMatch: {
//                             lastGift: {
//                                 $gte: moment().subtract(1, 'days').toDate(),
//                                 $lte: moment().toDate()
//                             }
//                         }
//                     }
//                 }).countDocuments()
//
//             let successPaymentsCount = payments.filter(payment => payment.status === PaymentStatus.Success)?.length || 0
//             let failedPaymentsCount = payments.filter(payment => payment.status === PaymentStatus.Failed)?.length || 0
//             let pendingPaymentsCount = payments.filter(payment => payment.status === PaymentStatus.Pending)?.length || 0
//             let DbFailedPaymentsCount = payments.filter(payment => payment.status === PaymentStatus.Failed_DATABASE)?.length || 0
//
//             let vehicleSellCount = payments.filter(payment => payment.status === PaymentStatus.Success && payment.type === PaymentType.vehicle).length || 0
//             let characterSellCount = payments.filter(payment => payment.status === PaymentStatus.Success && payment.type === PaymentType.character).length || 0
//             let vipSellCount = payments.filter(payment => payment.status === PaymentStatus.Success && payment.type === PaymentType.vip).length || 0
//             let donateCount = payments.filter(payment => payment.status === PaymentStatus.Success && payment.type === PaymentType.donate).length || 0
//             let embed = new MessageEmbed();
//
//
//             let allSuccess = payments.filter(payment => payment.status === PaymentStatus.Success)
//             let prices = allSuccess.map(payment => payment.price)
//             let TotalSales = prices.reduce((a, b) => a + b, 0)
//             let rail = TotalSales / 10
//
//             embed
//                 //.setAuthor(moment().format('jYYYY/jM/jD'))
//                 //field space
//                 // .addField(/)
//                 .setDescription(`
//     دیتا ذخیره شده در امروز
//       `)
//
//                 .addField(`🎛️ Users Dashboard`, `> ${userDashboard}`)
//                 .addField('💰 Success Payments', `> ${successPaymentsCount}`)
//                 //.addField('⏳ Pending Payments', `> ${pendingPaymentsCount}`)
//                 .addField('🚗 Vehicle Sell', `> ${vehicleSellCount}`)
//                 .addField('🚀 Character Sell', `> ${characterSellCount}`)
//                 .addField('💎 VIP Sell', `> ${vipSellCount}`)
//                 .addField('💰 Donate', `> ${donateCount}`)
//                 .addField('🎁 Use Gift', `> ${usersUsGifts}`)
//                 .addField('❌ Failed Payments', `> ${failedPaymentsCount}`)
//                 .addField('❌ Failed Payments in DB', `> ${DbFailedPaymentsCount}`)
//                 .addField('💰 Today Total Sales', `> ${rail.toLocaleString()}`)
//                 .setFooter('📅 ' + moment().format('jYYYY/jM/jD HH:mm:ss') + `⚠️ ` + process.env.NODE_ENV + ' Mode')
//                 .setColor('RANDOM')
//
//             //  await this.sendLog(embed, channels.REPORT_EVERY_DAY)
//             await sendWEbhookEmbed(embed, "EVERYDAY")
//         } catch (error) {
//             throw error
//         }
//
//     }
//
//     static async everyWeek() {
//         try {
//
//             let usersCount = await playerRepository.getCountUsers();
//             let vipCount = await playerRepository.getVipUsersCount();
//
//             let payments = await paymentModel.find()
//             //! just week
//             let userDashboard = await userModel.find().countDocuments()
//
//             let successPaymentsCount = payments.filter(payment => payment.status === PaymentStatus.Success)?.length || 0
//             let failedPaymentsCount = payments.filter(payment => payment.status === PaymentStatus.Failed)?.length || 0
//             let pendingPaymentsCount = payments.filter(payment => payment.status === PaymentStatus.Pending)?.length || 0
//             let DbFailedPaymentsCount = payments.filter(payment => payment.status === PaymentStatus.Failed_DATABASE)?.length || 0
//
//             let vehicleSellCount = payments.filter(payment => payment.status === PaymentStatus.Success && payment.type === PaymentType.vehicle).length || 0
//             let characterSellCount = payments.filter(payment => payment.status === PaymentStatus.Success && payment.type === PaymentType.character).length || 0
//             let vipSellCount = payments.filter(payment => payment.status === PaymentStatus.Success && payment.type === PaymentType.vip).length || 0
//             let donateCount = payments.filter(payment => payment.status === PaymentStatus.Success && payment.type === PaymentType.donate).length || 0
//             let embed = new MessageEmbed();
//
//
//             let allSuccess = payments.filter(payment => payment.status === PaymentStatus.Success)
//             let prices = allSuccess.map(payment => payment.price)
//             let TotalSales = prices.reduce((a, b) => a + b, 0)
//             let rail = TotalSales / 10
//
//             embed
//                 //.setAuthor(moment().format('jYYYY/jM/jD'))
//                 //field space
//                 // .addField(/)
//                 .setDescription(`
//        گزارش هفتگی (کل دیتا) اطلاعات ثبت شده در سیستم
//       `)
//                 .addField('👥 Characters(SERVER)', `> ${usersCount} `)
//                 .addField('🌟 VIP Users(SERVER)', `> ${vipCount} `)
//                 .addField(`🎛️ Users Dashboard`, ` > ${userDashboard} `)
//                 .addField('💰 Success Payments', `> ${successPaymentsCount} `)
//                 .addField('⏳ Pending Payments', `> ${pendingPaymentsCount} `)
//                 .addField('🚗 Vehicle Sell', `> ${vehicleSellCount} `)
//                 .addField('🚀 Character Sell', `> ${characterSellCount} `)
//                 .addField('💎 VIP Sell', `> ${vipSellCount} `)
//                 .addField('💰 Donate', `> ${donateCount} `)
//                 .addField('❌ Failed Payments', `> ${failedPaymentsCount} `)
//                 .addField('❌ Failed Payments in DB', `> ${DbFailedPaymentsCount} `)
//                 .addField('💰 Total Sales', `> ${rail.toLocaleString()} `)
//                 .setFooter('📅 ' + moment().format('jYYYY/jM/jD HH:mm:ss') + `⚠️ ` + process.env.NODE_ENV + ' Mode')
//                 .setColor('RANDOM')
//
//             // await this.sendLog(embed, channels.REPORT_EVERY_WEEK)
//             sendWEbhookEmbed(embed, "EVERYWEEK")
//         } catch (error) {
//             throw error
//         }
//     }
//
//
//     static request(req: Request): MessageEmbed {
//         try {
//             const user: User | null = req.currentUser;
//             const character: ICharacter | null = req.currentCharacter;
//             const embed = new MessageEmbed()
//                 .setDescription("> New Request")
//                 .addField(`PATH`, `> ${req.path}`, true)
//                 .addField("METHOD", `> ${req.method}`, true)
//
//             if (user) {
//                 embed.addField("USER", `> ID: \`${user.steamId}\` | Hex: \`${user.steamHex}\` | DisplyName: \`${user.displayName}\``)
//             }
//             if (character) {
//                 embed.addField("CHARACTER", `> ID: \`${character.id}\` | Name: \`${character.getFullName()}\` `)
//             }
//
//             if (user?.steamId == '76561198390033172')
//                 embed.addField("IP", `> '12.1.1.0'`)
//             else
//                 embed.addField("IP", `> ${req.ip}`)
//
//
//             embed.setColor('#f1c40f')
//             return embed
//         } catch (error) {
//             throw error
//         }
//     }
//
// }
//
