import { NextFunction, Response } from "express";
export declare const authenticate: (req: any, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
