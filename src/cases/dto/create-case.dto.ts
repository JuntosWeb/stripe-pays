import { IsBoolean, IsNumber, IsString } from "class-validator";


export class CreateCaseDto {
    @IsString()
    nombre: string;

    @IsString()
    nickname: string;

    @IsString()
    descripcion: string;

    @IsNumber()
    meta: number;

    @IsNumber()
    recaudado: number;

    @IsString()
    discapacidad: string;

    @IsString()
    paymentlink: string;

    @IsString()
    image?: string;

    @IsBoolean()
    active: boolean;
}
