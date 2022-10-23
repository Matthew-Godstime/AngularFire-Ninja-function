import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";


export function pageNotFound(req: Request, res: Response) {
    res.status(StatusCodes.NOT_FOUND).json({ error: "Page not found" });
}

export function internalServerError(error: Error, req: Request, res: Response, next: NextFunction) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Our server is taking a nap! :)" });
}