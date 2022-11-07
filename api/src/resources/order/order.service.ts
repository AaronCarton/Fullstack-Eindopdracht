import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ObjectId } from 'mongodb'
import { CreateOrderInput } from './dto/create-order.input'
import { UpdateOrderInput } from './dto/update-order.input'
import { Order, OrderStatus } from './entities/order.entity'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  create(uid: string, createOrderInput: CreateOrderInput) {
    return this.orderRepo.save({ customerId: uid, ...createOrderInput })
  }

  findAll() {
    return this.orderRepo.find()
  }

  findOne(id: string) {
    return this.orderRepo.findOne(new ObjectId(id))
  }

  async findOrdersByUser(uid: string) {
    return this.orderRepo.findBy({ customerId: uid })
  }

  async findActiveOrders() {
    return this.orderRepo.find({ where: { status: OrderStatus.cooking } })
  }

  async update(id: string, updateOrderInput: UpdateOrderInput) {
    await this.orderRepo.update(new ObjectId(id), updateOrderInput)
    return this.orderRepo.findOne(new ObjectId(id))
  }

  remove(id: string) {
    return this.orderRepo.delete(new ObjectId(id))
  }
}
