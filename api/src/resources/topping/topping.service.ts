import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { ObjectId } from 'mongodb'
import { Topping } from './entities/topping.entity'
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
