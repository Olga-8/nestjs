import { JwtSekretKey } from "@app/config";
import { ExpressRequestInterface } from "@app/types/expressRequest.interface";
import { UserService } from "@app/user/user.service";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { verify } from 'jsonwebtoken'

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private userService: UserService) {}
  
    async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
        if(!req.headers.authorization) {
            req.user = null;
            next();
            return;
        }

        const token = req.headers.authorization;

        try {
            const decoded = verify(token, JwtSekretKey);
            const user = await this.userService.findCurrentUserById(decoded.id);
            console.log('decoded:', decoded);
            req.user = user;

        } catch (error) {
            console.log('Token verification error:', error.message);
            req.user = null;
        }
        next();
    }
}
