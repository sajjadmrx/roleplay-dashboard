export interface IUpdateCharacter {
    price: string | number;
    isEnabled: string | boolean;
    discount: string | number;
    MAX_CHARACTER_REACHED: string | number;
}
export interface IUpdateVip {
    isEnabled: string | boolean;
    month: string;
    price: string | number;
    discount: string | number;
    orginalPrice?: number;
}