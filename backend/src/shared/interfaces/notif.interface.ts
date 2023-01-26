import { Document, Schema } from "mongoose";

export interface INotif extends Document {
  description: string;
  public: boolean;
  isRead: boolean;
  isLast: boolean;
  createdAt: Date;
  updatedAt: Date;
}