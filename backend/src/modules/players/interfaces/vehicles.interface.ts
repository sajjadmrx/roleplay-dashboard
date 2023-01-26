import { owned_vehicles } from "@prisma/client";

export interface OwnedVehicles
  extends Pick<
    owned_vehicles,
    | "vehicleId"
    | "stored"
    | "garage_name"
    | "vehiclename"
    | "plate"
    | "type"
    | "garage"
  > {}
