import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { SubscribeMessage } from '@nestjs/websockets';
// import { eventNames } from 'process';
import { Socket } from 'socket.io';
import { Payment } from 'src/payments/entities/payment.entity';
import { Repository, DataSource } from 'typeorm';

interface ConnectedClients {
    [id: string]: Socket
}

@Injectable()
export class ReportPaymentsWsService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
        private readonly dataSource: DataSource,
    ) {

    }
    private connectedClients: ConnectedClients = {}


    async registerClient(client: Socket) {
        this.connectedClients[client.id] = client;
        // return await this.paymentRepository.find({})
    }

    removeClient(client_id: string) {
        delete this.connectedClients[client_id]
    }

    async getDatabaseData(id: string) {
        const data = await this.dataSource.getRepository(Payment)
            .createQueryBuilder('payment')
            .select("SUM(payment.monto)", "sum")
            .where("payment.caso_id = :id", { id })
            .getRawOne()
        return data
        // return await this.paymentRepository.find({
        //     where: {
        //         caso_id: id
        //     }
        // })
    }
}
