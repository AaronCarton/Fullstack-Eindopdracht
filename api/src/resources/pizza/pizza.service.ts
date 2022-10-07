import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { ObjectID, Repository } from 'typeorm'
import { CreatePizzaInput } from './dto/create-pizza.input'
import { UpdatePizzaInput } from './dto/update-pizza.input'
import { Pizza } from './entities/pizza.entity'

@Injectable()
export class PizzaService {
  constructor(
    @InjectRepository(Pizza)
    private readonly pizzaRepo: Repository<Pizza>,
  ) {}

  create(createPizzaInput: CreatePizzaInput) {
    return this.pizzaRepo.save(createPizzaInput)
  }

  findAll() {
    return this.pizzaRepo.find()
  }

  findOne(id: string) {
    return this.pizzaRepo.findOneBy({ id: id })
  }

  async update(id: string, updatePizzaInput: UpdatePizzaInput) {
    await this.pizzaRepo.update(id, updatePizzaInput)
    return this.pizzaRepo.findOneBy({ id: id })
  }

  remove(id: string) {
    return this.pizzaRepo.delete(id)
  }
}
