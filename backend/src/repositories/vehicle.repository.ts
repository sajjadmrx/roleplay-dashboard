import vehiclesModel from "../models/vehicle.model";
import { repository } from "./repository";
import {
  VehicleCreateInput,
  IVehicle,
  VehicleUpdateInput,
  VehicleSelector,
} from "../shared/interfaces/vehicles.interface";

export class VehicleRepository extends repository<typeof vehiclesModel> {
  async create(input: VehicleCreateInput): Promise<IVehicle> {
    return this.rep.create(input);
  }

  async find(): Promise<IVehicle[]> {
    return this.rep.find({});
  }

  async findOnlyPublished(
    selector: Partial<VehicleSelector> = {}
  ): Promise<IVehicle[]> {
    return this.rep.find({ isPublished: true }, selector, {
      sort: { createdAt: -1 },
    });
  }

  async findByCategoryAndOnlyPublished(
    category: number,
    selector: Partial<VehicleSelector> = {}
  ): Promise<IVehicle[]> {
    return this.rep.find({ isPublished: true, category }, selector, {
      sort: { createdAt: -1 },
    });
  }

  async findById(id: string): Promise<IVehicle | null> {
    return this.rep.findOne({ vehicles_id: id });
  }

  async findByNameServer(nameServer: string): Promise<IVehicle | null> {
    return this.rep.findOne({ nameServer });
  }

  async updateById(id: string, input: VehicleUpdateInput): Promise<boolean> {
    const result = await this.rep.updateOne(
      { vehicles_id: id },
      { $set: { ...input } }
    );
    return result.modifiedCount > 0;
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.rep.deleteOne({ vehicles_id: id });
    return result.deletedCount > 0;
  }
}
