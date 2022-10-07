import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { ObjectId } from 'mongodb'
import { Pizza } from './entities/pizza.entity'
import { CreatePizzaInput } from './dto/create-pizza.input'
import { UpdatePizzaInput } from './dto/update-pizza.input'

@Injectable()
export class PizzaService {
  constructor(
    @InjectRepository(Pizza)
    private readonly pizzaRepo: Repository<Pizza>,
  ) {}

  create(createPizzaInput: CreatePizzaInput) {
    return this.pizzaRepo.save(createPizzaInput)
  }

  async findAll() {
    const pizzas = await this.pizzaRepo.find()
    console.log(pizzas)
    return pizzas
  }

  findOne(id: string) {
    return this.pizzaRepo.findOne(new ObjectId(id))
  }

  async update(id: string, updatePizzaInput: UpdatePizzaInput) {
    await this.pizzaRepo.update(id, updatePizzaInput)
    return this.pizzaRepo.findOne(new ObjectId(id))
  }

  remove(id: string) {
    return this.pizzaRepo.delete(id)
  }
}
