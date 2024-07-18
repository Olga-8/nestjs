import { Body, Controller, Get, Post, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from "./dto/createUser.dto";
import { UserResponseInterface } from "./types/userResponse.interface";
import { UserLoginDto } from "./dto/loginUser.dto";
import { Request } from 'express';
import { ExpressRequestInterface } from "@app/types/expressRequest.interface";

@Controller()
export class UserController {
    constructor(private userService: UserService) {}

    @Post('users')
    @UsePipes(new ValidationPipe())
    async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.createUser(createUserDto);
        return this.userService.userResponse(user);
    }

    @Post('users/login')
    @UsePipes(new ValidationPipe())
    async usersLogin(@Body('user') userLoginDto: UserLoginDto): Promise<UserResponseInterface> {
        const user = await this.userService.userLogin(userLoginDto);

        console.log(user);

        return  this.userService.userResponse(user);
    }

    @Get('user')
    async getCurrentUser(@Req() request: ExpressRequestInterface): Promise<UserResponseInterface> {
        const user = request.user;
        return this.userService.userResponse(user);
    }
}
