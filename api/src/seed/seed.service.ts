import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'

import * as jsonData from './data/seeding-data.json' //tsconfig "resolveJsonModule": true,
import { plainToInstance } from 'class-transformer' //https://www.npmjs.com/package/class-transformer
import { Topping } from 'src/resources/topping/entities/topping.entity'
import { Pizza } from 'src/resources/pizza/entities/pizza.entity'
import { Order } from 'src/resources/order/entities/order.entity'
import { Review } from 'src/resources/review/entities/review.entity'
import { User } from 'src/resources/user/entities/user.entity'

@Injectable()
export class DatabaseSeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Topping)
    private toppingRepo: Repository<Topping>,
    @InjectRepository(Pizza)
    private pizzaRepo: Repository<Pizza>,
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,
  ) {}

  async addUsers(): Promise<User[]> {
    const data = jsonData.users.map((p) => ({ ...p, _id: new ObjectId(p._id) }))
    const instances = plainToInstance(Topping, data)
    return this.userRepo.save(instances).catch(() => null)
  }

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

  async addReviews(): Promise<Review[]> {
    const data = jsonData.reviews.map((p) => ({ ...p, _id: new ObjectId(p._id) }))
    const instances = plainToInstance(Topping, data)
    return this.reviewRepo.save(instances)
  }

  async wipeDatabase(): Promise<void> {
    await this.orderRepo.clear().catch(() => null)
    await this.pizzaRepo.clear().catch(() => null)
    await this.toppingRepo.clear().catch(() => null)
    await this.reviewRepo.clear().catch(() => null)
    return Promise.resolve()
  }
}
