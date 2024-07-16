import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from './user.entity';

@Controller()
export class UserController {
    constructor(private userService: UserService) {}

    @Post('users')
    async createUser(@Body('user') createUserDto: CreateUserDto){
        const user = await this.userService.createUser(createUserDto);
        return this.userService.userResponse(user);
    }

}
