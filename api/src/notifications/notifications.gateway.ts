import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { WebSocketServer } from '@nestjs/websockets'

@WebSocketGateway()
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  numberOfClients = 0

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(payload)
    //throw new WsException('Method not implemented.')
    return 'Hello world!'
  }

  handleDisconnect(client: any) {
    //throw new Error('Method not implemented.')
    this.numberOfClients--
    this.server.emit('users:userLeaving', {
      connectedUsers: this.numberOfClients,
    })
  }
  handleConnection(client: any, ...args: any[]) {
    this.numberOfClients++
    // Notify connected clients of current users
    this.server.emit('users:newuserconnetected', {
      connectedUsers: this.numberOfClients,
    })
    console.log('A client has connected')
    console.log(`Number of clients: ${this.numberOfClients}`)
  }
}
