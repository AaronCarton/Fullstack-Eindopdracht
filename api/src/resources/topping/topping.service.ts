import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { ObjectId } from 'mongodb'
import { Topping } from './entities/topping.entity'
import { Pizza } from '../pizza/entities/pizza.entity'
import { CreateToppingInput } from './dto/create-topping.input'
import { UpdateToppingInput } from './dto/update-topping.input'

@Injectable()
export class ToppingService {
  constructor(
    @InjectRepository(Topping)
    private readonly toppingRepo: Repository<Topping>,
  ) {}

  create(createToppingInput: CreateToppingInput) {
    return this.toppingRepo.save(createToppingInput)
  }

  findAllByPizza(pizza: Pizza) {
    console.log(pizza.toppingsIds)

    return pizza.toppingsIds.map((id) => this.toppingRepo.findOne(new ObjectId(id)))
  }

  findAll() {
    return this.toppingRepo.find()
  }

  findOne(id: string) {
    return this.toppingRepo.findOne(new ObjectId(id))
  }

  async update(id: string, updateToppingInput: UpdateToppingInput) {
    await this.toppingRepo.update(id, updateToppingInput)
    return this.toppingRepo.findOneBy({ id: id })
  }

  remove(id: string) {
    return this.toppingRepo.delete(id)
  }
}
