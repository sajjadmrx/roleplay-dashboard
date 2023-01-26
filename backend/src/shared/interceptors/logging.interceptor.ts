// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   NestInterceptor
// } from "@nestjs/common";
// import { Request, Response, NextFunction } from "express";
// import { Observable } from "rxjs";
// import { InjectQueue } from "@nestjs/bull";
// import { Queue } from "bull";
// import { tap } from "rxjs/operators";
//
// import { User } from "../interfaces/user.interface";
// import { getIpFromRequest } from "../../utils/ip.util";
// import { QueueKeysConstant } from "../constants/queue-keys-constant";
// import { RequestLoggerInput } from "../interfaces/logger.interface";
//
// @Injectable()
// export class LoggingInterceptor implements NestInterceptor {
//   constructor(
//     @InjectQueue(QueueKeysConstant.REQUEST_LOGGER)
//     private requestLoggerQueue: Queue<RequestLoggerInput>
//   ) {
//   }
//
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const now = Date.now();
//     return next.handle().pipe(
//       tap(async () => {
//         const req: Request = context.switchToHttp().getRequest();
//         const res: Response = context.switchToHttp().getResponse();
//
//         if (req.originalUrl.includes("/download/photo")) return;
//
//         const user: User | undefined = req.user as User | undefined;
//         const end = Date.now() - now;
//
//         let message = `${req.method} | ${req.originalUrl} | ${res.statusCode} |  Processed in ${end}ms`;
//
//         const query = req.query;
//         const body = req.body;
//
//         const ip = getIpFromRequest(req);
//         if (process.env.NODE_ENV != "development")
//           await this.requestLoggerQueue.add({
//             ip, query, body, user: {
//               userId: user?.userId || null,
//               username: user?.username || null,
//               email: user?.username || null
//             }, message
//           });
//       })
//     );
//   }
// }
