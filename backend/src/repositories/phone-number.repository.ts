// import {
//   IPhoneNumber,
//   PhoneNumberInputCreate,
//   PhoneNumberInputUpdate,
// } from "../shared/interfaces/phone-number.interface";
// import { repository } from "./repository";
//
// export class PhoneNumberRepository extends repository<typeof phoneNumberModel> {
//   async create(input: PhoneNumberInputCreate): Promise<IPhoneNumber> {
//     return this.rep.create(input);
//   }
//
//   async findSortedBySold(): Promise<IPhoneNumber[]> {
//     return this.rep.find(
//       {},
//       {},
//       {
//         sort: {
//           isSold: 1,
//           createdAt: -1,
//         },
//       }
//     );
//   }
//
//   async findById(id: string): Promise<IPhoneNumber | null> {
//     return this.rep.findOne({ _id: id });
//   }
//
//   async findByNumber(number: string): Promise<IPhoneNumber | null> {
//     return this.rep.findOne({ number });
//   }
//
//   async updateById(
//     id: String,
//     input: PhoneNumberInputUpdate
//   ): Promise<boolean> {
//     const result = await this.rep.updateOne(
//       { _id: id },
//       { $set: { ...input } }
//     );
//     return result.modifiedCount > 0;
//   }
//
//   async deleteById(id: string): Promise<boolean> {
//     const result = await this.rep.deleteOne({ _id: id });
//     return result.deletedCount > 0;
//   }
// }
