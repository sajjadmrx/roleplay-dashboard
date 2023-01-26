
import { Document } from 'mongoose'
interface IEndof {
    date: Date
    number: string
}
export interface IPhoneNumber {
    id: string
    number: string,
    isSold: boolean,
    isSuggested: boolean,
    price: number;
    discount: number;
    endof: IEndof;
    createdAt: Date;
    updatedAt: Date;
    getPriceWithDiscount(): number;
}
export interface PhoneNumberInputCreate extends Omit<IPhoneNumber, 'id' | 'createdAt' | 'updatedAt' | 'getPriceWithDiscount'> { }
export interface PhoneNumberInputUpdate extends Partial<PhoneNumberInputCreate> { }
// export interface IPhoneNumberDocument extends IPhoneNumber, Document { }