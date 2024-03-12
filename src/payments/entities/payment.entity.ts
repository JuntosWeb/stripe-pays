import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('pagos')
export class Payment {
    @PrimaryGeneratedColumn()
    id: number

    /* Relations */
    @Column()
    caso_id: string

    @Column({type:'float'})
    monto: number

    @Column()
    stripe_product_id: string

    @Column()
    stripe_payment_intent: string

    @Column()
    stripe_payment_link: string

    @Column()
    stripe_payment_status: string

}
