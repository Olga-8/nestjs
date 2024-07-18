import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from "./dto/createUser.dto";
import { UserResponseInterface } from "./types/userResponse.interface";
import { UserLoginDto } from "./dto/loginUser.dto";
import { User } from "@app/user/decorators/user.decorator";
import { UserEntity } from '@app/user/user.entity';
import { AuthGuard } from "@app/user/guards/auth.guard";
import { UpdateUserDto } from "./dto/updateUser.dto";

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
    @UseGuards(AuthGuard)
    async getCurrentUser( @User() user: UserEntity): Promise<UserResponseInterface> {
        console.log('user:', user);
        return this.userService.userResponse(user);
    }

    @Put('user')
    @UseGuards(AuthGuard)
    async updateCurrentUser(
        @User('id') currentUserId: number,
        @Body('user') updateUserDto: UpdateUserDto
    ): Promise<UserResponseInterface> {
        const user = await this.userService.updateUser(currentUserId, updateUserDto);
        return this.userService.userResponse(user);
    }
}
