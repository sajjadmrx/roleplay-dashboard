import Bull, { Job } from "bull";
import { Request } from "express";
import { LoggerTypesEnum } from "../../shared/enums/logger-types.enum";
import { LoggerSystemProccesser } from "./queue.consumer";

export const loggerQueue = new Bull(
  "system-logger",
  String(process.env.REDIS_URL)
);

export function createSystemLogger(message: string, type: LoggerTypesEnum) {
  loggerQueue.add(
    {
      message,
      type,
    },
    {
      priority: 1,
      attempts: 2,
      removeOnComplete: true,
      removeOnFail: true,
    }
  );
}

loggerQueue.process(LoggerSystemProccesser);
