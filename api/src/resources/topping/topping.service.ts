import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Topping } from './entities/topping.entity'
import { CreateToppingInput } from './dto/create-topping.input'
import { UpdateToppingInput } from './dto/update-topping.input'

@Injectable()
export class ToppingService {
  constructor(
    @InjectRepository(Topping)
    private readonly toppingRepository: Repository<Topping>,
  ) {}

  create(createToppingInput: CreateToppingInput) {
    return this.toppingRepository.save(createToppingInput)
  }

  findAll() {
    return this.toppingRepository.find()
  }

  findOne(id: string) {
    return this.toppingRepository.findOneBy({ id: id })
  }

  async update(id: string, updateToppingInput: UpdateToppingInput) {
    await this.toppingRepository.update(id, updateToppingInput)
    return this.toppingRepository.findOneBy({ id: id })
  }

  remove(id: string) {
    return this.toppingRepository.delete(id)
  }
}
