import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'

import * as jsonData from './data/seeding-data.json' //tsconfig "resolveJsonModule": true,
import { plainToInstance } from 'class-transformer' //https://www.npmjs.com/package/class-transformer
import { Topping } from 'src/resources/topping/entities/topping.entity'
import { Pizza } from 'src/resources/pizza/entities/pizza.entity'
import { Order } from 'src/resources/order/entities/order.entity'

@Injectable()
export class DatabaseSeedService {
  constructor(
    @InjectRepository(Topping)
    private toppingRepo: Repository<Topping>,
    @InjectRepository(Pizza)
    private pizzaRepo: Repository<Pizza>,
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}

  async addToppings(): Promise<Topping[]> {
    const data = jsonData.toppings.map((p) => ({ ...p, _id: new ObjectId(p._id) }))
    const instances = plainToInstance(Topping, data)
    return this.toppingRepo.save(instances)
  }

  async addPizzas(): Promise<Pizza[]> {
    // convert string ids to ObjectIds
    const data = jsonData.pizzas.map((p) => ({ ...p, _id: new ObjectId(p._id) }))
    // convert json data to instances
    const instances = plainToInstance(Topping, data)
    // save instances to database
    return this.pizzaRepo.save(instances)
  }

  async addOrders(): Promise<Order[]> {
    const data = jsonData.orders.map((p) => ({ ...p, _id: new ObjectId(p._id) }))
    const instances = plainToInstance(Topping, data)
    return this.orderRepo.save(instances)
  }

  async wipeDatabase(): Promise<void> {
    await this.orderRepo.clear()
    await this.pizzaRepo.clear()
    await this.toppingRepo.clear()
    return Promise.resolve()
  }
}