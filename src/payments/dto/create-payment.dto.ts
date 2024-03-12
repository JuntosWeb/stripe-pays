import { IsString } from "class-validator"

export class CreatePaymentDto {
    @IsString()
    name: string;

    @IsString()
    descripcion: string;
    
    @IsString()
    campaniaKey: string;
}
