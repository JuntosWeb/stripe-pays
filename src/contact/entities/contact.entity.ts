import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('contact')
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    cellphone: string;

    @Column()
    campania_key: string;
}
