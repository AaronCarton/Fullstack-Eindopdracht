import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ObjectId } from 'mongodb'
import { CreateOrderInput } from './dto/create-order.input'
import { UpdateOrderInput } from './dto/update-order.input'
import { Order } from './entities/order.entity'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  create(createOrderInput: CreateOrderInput) {
    return this.orderRepo.save(createOrderInput)
  }

  findAll() {
    return this.orderRepo.find()
  }

  findOne(id: string) {
    return this.orderRepo.findOne(new ObjectId(id))
  }

  async update(id: string, updateOrderInput: UpdateOrderInput) {
    await this.orderRepo.update(new ObjectId(id), updateOrderInput)
    return this.orderRepo.findOne(new ObjectId(id))
  }

  remove(id: string) {
    return this.orderRepo.delete(new ObjectId(id))
  }
}
