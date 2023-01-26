export interface IVehicle {

    vehicles_id: string;
    name: string;
    nameServer: string;
    price: number;
    discount: number;
    category: number;
    images: string[];
    video: string;
    canGift: boolean;
    //  targetCharacterId: string;
    isPublished: boolean;
    isTest: boolean;
    isSuggested: boolean;
    isOffer: boolean;
    createdAt: Date;
    updatedAt: Date;
    getPriceWithDiscount(): number;
    getThumbnailUrl(): string;
    getCateGoryName(): string;
}
export interface VehicleCreateInput extends Omit<IVehicle, 'createdAt' | 'updatedAt' | 'getPriceWithDiscount' | 'getThumbnailUrl' | 'getCateGoryName'> { }
export interface IVehicleInput {
    name: string;
    nameServer: string;
    price: string;
    discount: string;
    category: string;
    isSuggested: string;
    isOffer: string;
    isTest: string;
    images: string[];
    video: string;
    canGift: string;
}
export interface VehicleUpdateInput extends Partial<VehicleCreateInput> { }

export interface VehicleSelector {
    _id: boolean
    vehicles_id: boolean;
    name: boolean;
    nameServer: boolean;
    price: boolean;
    discount: boolean;
    category: boolean;
    images: boolean
    video: boolean;
    canGift: boolean;
    //  targetCharacterId: string;
    isPublished: boolean;
    isTest: boolean;
    isSuggested: boolean;
    isOffer: boolean;
}
export class VehiclesInput {
    name: string;
    nameServer: string;
    price: number;
    discount: number;
    category: number;
    isSuggested: boolean;
    isOffer: boolean;
    isTest: boolean;
    images: string[];
    video: string;
    canGift: boolean;
    constructor(data: IVehicleInput) {

        this.name = data.name;
        this.nameServer = data.nameServer;
        this.price = parseInt(data.price);
        this.discount = parseInt(data.discount);
        this.category = Number(data.category);
        this.images = data.images;
        this.isSuggested = data.isSuggested == 'on' ? true : false;
        this.isOffer = data.isOffer == 'on' ? true : false;
        this.isTest = data.isTest == 'on' ? true : false;
        this.video = data.video;
        this.canGift = data.canGift == 'on' ? true : false;
    }




}


