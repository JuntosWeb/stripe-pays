import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cases')
export class Case {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    stripe_product_id: string;

    @Column()
    nombre: string;

    @Column()
    nickname: string;

    @Column({ unique: true })
    campaniaKey: string;

    @Column()
    descripcion: string;

    @Column()
    meta: number;

    @Column()
    recaudado: number;

    @Column()
    discapacidad: string

    @Column()
    paymentlink: string

    @Column()
    image: string

    @Column({ default: true })
    active: boolean
}
