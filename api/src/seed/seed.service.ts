import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'

import * as jsonData from './data/seeding-data.json' //tsconfig "resolveJsonModule": true,
import { plainToInstance } from 'class-transformer' //https://www.npmjs.com/package/class-transformer
import { Topping } from 'src/resources/topping/entities/topping.entity'
import { Pizza } from 'src/resources/pizza/entities/pizza.entity'
import { Order } from 'src/resources/order/entities/order.entity'
import { Item } from 'src/resources/item/entities/item.entity'

@Injectable()
export class DatabaseSeedService {
  constructor(
    @InjectRepository(Topping)
    private toppingRepo: Repository<Topping>,
    @InjectRepository(Pizza)
    private pizzaRepo: Repository<Pizza>,
    @InjectRepository(Item)
    private itemRepo: Repository<Item>,
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

  async addItems(): Promise<Item[]> {
    const data = jsonData.items.map((p) => ({ ...p, _id: new ObjectId(p._id) }))
    const instances = plainToInstance(Item, data)
    return this.itemRepo.save(instances)
  }

  async addOrders(): Promise<Order[]> {
    const data = jsonData.orders.map((p) => ({ ...p, _id: new ObjectId(p._id) }))
    const instances = plainToInstance(Topping, data)
    return this.orderRepo.save(instances)
  }

  async wipeDatabase(): Promise<void> {
    await this.orderRepo.clear().catch(() => null)
    await this.pizzaRepo.clear().catch(() => null)
    await this.itemRepo.clear().catch(() => null)
    await this.toppingRepo.clear().catch(() => null)
    return Promise.resolve()
  }
}
