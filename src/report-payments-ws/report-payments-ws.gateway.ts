import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ReportPaymentsWsService } from './report-payments-ws.service';


@WebSocketGateway({ cors: true, namespace: '/reportingPayments' })
export class ReportPaymentsWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server

  constructor(
    private readonly reportPaymentsWsService: ReportPaymentsWsService,
    private readonly reportService: ReportPaymentsWsService,
  ) {

  }
  handleConnection(client: Socket,/*  ...args: any[] */) {
    // console.log("cliente conectado", client.id);
    this.reportPaymentsWsService.registerClient(client)
    // this.wss.emit('client-updated', )
    // throw new Error('Method not implemented.');
  }
  handleDisconnect(client: Socket) {
    // console.log('cliente desconectado', client.id);
    // throw new Error('Method not implemented.');
  }

  @SubscribeMessage('hello-client')
  async handleMessageFromClient(client: Socket, payload: any) {
    setInterval(async () => {
      const data = await this.reportService.getDatabaseData(payload.id)
      client.emit('hello-server', { data })
    }, 2000)
  }

}
