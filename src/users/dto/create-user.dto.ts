import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Role } from "src/roles/entities/role.entity";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    userName: string
    
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsNumber()
    rol: Role;


}
