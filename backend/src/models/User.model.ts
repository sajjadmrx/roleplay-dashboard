// import mongoose, {
//   Schema,
//   PaginateModel,
//   PaginateOptions,
//   Types,
// } from "mongoose";
// import { Permissions } from "../enums/permissions.enums";
// import { User } from "../shared/interfaces/User.interface";
//
// import mongoosePaginate from "mongoose-paginate-v2";
// import AuthorizationDiscord, {
//   UtilsAuthorizationDiscord,
// } from "../Discord/auth.discord";
//
// const UserSchema = new Schema<User>(
//   {
//     steamId: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     steamHex: {
//       type: String,
//       required: true,
//     },
//     displayName: {
//       type: String,
//       required: true,
//     },
//     avatar: {
//       type: String,
//       required: true,
//       default: "/images/default-avatar.png",
//     },
//     discord: {
//       id: {
//         type: String,
//         default: "",
//       },
//       isLinked: {
//         type: Boolean,
//         default: false,
//       },
//       token: {
//         type: String,
//         default: "",
//       },
//       refresh_token: {
//         type: String,
//         default: "",
//       },
//       email: {
//         type: String,
//         default: "",
//       },
//     },
//     notifications: {
//       purchases: {
//         type: Boolean,
//         default: true,
//       },
//       updateShop: {
//         type: Boolean,
//         default: false,
//       },
//       giveaways: {
//         type: Boolean,
//         default: false,
//       },
//       login: {
//         type: Boolean,
//         default: true,
//       },
//       webhookUrl: {
//         type: String,
//         default: null,
//       },
//     },
//     permissions: {
//       type: [String],
//       required: true,
//       default: [Permissions.USER],
//     },
//     gifts: {
//       type: [
//         {
//           characterId: {
//             type: String,
//             required: true,
//           },
//           nextGift: {
//             type: Date,
//             required: true,
//             default: new Date(0),
//           },
//           lastGift: {
//             type: Date,
//             required: true,
//             default: new Date(0),
//           },
//         },
//       ],
//     },
//   },
//   { timestamps: true, toJSON: { virtuals: true } }
// );
//
// UserSchema.plugin(mongoosePaginate);
//
// UserSchema.virtual("payment", {
//   ref: "Payment",
//   localField: "steamHex",
//   foreignField: "user",
//   justOne: false,
// });
//
// UserSchema.methods.isDiscordLinked = async function (): Promise<boolean> {
//   const result = await UtilsAuthorizationDiscord.checkToken(this.discord.token);
//   if (result) {
//     this.discord.isLinked = true;
//   }
//   return result;
// };
//
// const userModel = mongoose.model<User, PaginateModel<User>>("User", UserSchema);
// export default userModel;
