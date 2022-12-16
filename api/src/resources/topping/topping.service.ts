import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { ObjectId } from 'mongodb'
import { Topping } from './entities/topping.entity'
import { CreateToppingInput } from './dto/create-topping.input'
import { UpdateToppingInput } from './dto/update-topping.input'
import { HttpException } from '@nestjs/common/exceptions'

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

  findByName(name: string) {
    return this.toppingRepo.findOneBy({ name: name })
  }

  async decreaseStock(id: string, amount = 1) {
    const topping = await this.toppingRepo.findOneBy(new ObjectId(id))
    if (topping.stock <= 0) throw new HttpException(`${topping.name} is out of stock`, 400)
    await this.toppingRepo.update(id, { stock: topping.stock - amount })
  }

  async update(id: string, updateToppingInput: UpdateToppingInput) {
    await this.toppingRepo.update(id, updateToppingInput)
    return this.toppingRepo.findOneBy({ id: id })
  }

  remove(id: string) {
    return this.toppingRepo.delete(id)
  }
}
