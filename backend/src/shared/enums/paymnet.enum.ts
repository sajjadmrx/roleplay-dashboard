export enum PaymentStatus {

    Pending,
    Suucess_payment,
    Success,
    Failed,
    Cancled,
    Back_Money,
    Failed_DATABASE,
}
export enum PaymentType {
    vehicle,
    vip,
    character,
    donate,
    phoneNumber
}

export const paymentMessages = {
    "1": "پرداخت انجام نشده است",
    "2": `پرداخت ناموفق بوده است`,
    "3": `خطا رخ داده است`,
    "4": `بلوکه شده`,
    "5": `برگشت به پرداخت کننده`,
    "6": `برگشت خورده سیستمی`,
    "7": "پرداخت لغو شد",
    "8": "به درگاه پرداخت منتقل شد",
    "10": "در انتظار تایید پرداخت",
    "100": "پرداخت تایید شده است",
    "101": "پرداخت قبلا تایید شده است",
    "200": "به دریافت کننده واریز شد"
}