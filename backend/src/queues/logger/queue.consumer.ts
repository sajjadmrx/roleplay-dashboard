import { Job } from "bull";
import { LoggerTypesEnum } from "../../shared/enums/logger-types.enum";
import { errorLogger, infoLogger } from "../../utils/logger.util";

export async function LoggerSystemProccesser(job: Job) {
  try {
    const data: any = job.data;
    const loggerType: LoggerTypesEnum = data.type as LoggerTypesEnum;
    if (loggerType == LoggerTypesEnum.ERROR) {
      await errorLogger(data.message);
    } else if (loggerType == LoggerTypesEnum.INFO) {
      await infoLogger(data.message);
    }
  } catch (e) {
    throw e;
  }
}
