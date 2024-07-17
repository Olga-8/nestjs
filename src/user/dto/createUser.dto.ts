import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @Matches(/^[A-Za-z\s]+$/, {
        message: 'Name can only contain letters and spaces',
    })
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}
