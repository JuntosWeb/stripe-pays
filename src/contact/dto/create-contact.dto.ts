import { IsString } from "class-validator";

export class CreateContactDto {

    @IsString()
    email: string;

    @IsString()
    cellphone: string;

    @IsString()
    campania_key: string;
}
