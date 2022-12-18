import { ObjectId } from 'mongodb'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateItemInput } from './dto/create-item.input'
import { UpdateItemInput } from './dto/update-item.input'
import { Item, ItemType } from './entities/item.entity'
import { HttpException } from '@nestjs/common/exceptions'

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
  ) {}
  create(createItemInput: CreateItemInput) {
    return this.itemRepo.save(createItemInput)
  }

  findAll() {
    return this.itemRepo.find()
  }

  findOne(id: string) {
    return this.itemRepo.findOne(new ObjectId(id))
  }

  findByName(name: string) {
    return this.itemRepo.findOneBy({ name: name })
  }

  findByCategory(category: string) {
    return this.itemRepo.findBy({ category: ItemType[category] })
  }

  async decreaseStock(id: string, amount = 1) {
    const item = await this.itemRepo.findOneBy(new ObjectId(id))
    if (item.stock <= 0) throw new HttpException(`${item.name} is out of stock`, 400)
    this.itemRepo.update(id, { stock: item.stock - amount })
  }

  update(id: string, updateItemInput: UpdateItemInput) {
    return this.itemRepo.update(new ObjectId(id), updateItemInput)
  }

  remove(id: string) {
    return this.itemRepo.delete(new ObjectId(id))
  }
}
