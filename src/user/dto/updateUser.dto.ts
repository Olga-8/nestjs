import { IsEmail, IsNotEmpty, IsOptional, Matches } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty()
    @Matches(/^[A-Za-z\s]+$/, {
        message: 'Name can only contain letters and spaces',
    })
    readonly name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsOptional()
    @IsNotEmpty()
    readonly password: string;
}