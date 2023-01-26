import { customAlphabet } from 'nanoid'


export function getRandomVehicleId(): string {
    const nanoid = customAlphabet('1234567890', 10);
    return nanoid()
}