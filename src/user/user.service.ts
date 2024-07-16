import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';   
import { JwtSekretKey } from '@app/config';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity>{
        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);
        return await this.userRepository.save(newUser);
    }

    userResponse(user: UserEntity){
        const token =  this.generateJWT(user);
        const { password, ...result } = user;
        return { 
            user:
                {
                    token, ...result
                } 
        };
    }

    generateJWT(user: UserEntity): string{
        return sign({
            id: user.id,
            email: user.email,
            name: user.name
        }, JwtSekretKey, { expiresIn: '1d'});
    }
}
