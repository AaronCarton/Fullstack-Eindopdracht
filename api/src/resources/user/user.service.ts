import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { ObjectId } from 'mongodb'
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.userRepo.save(createUserInput)
  }

  findAll() {
    return this.userRepo.find()
  }

  findOne(id: string) {
    return this.userRepo.findOne(new ObjectId(id))
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    await this.userRepo.update(id, updateUserInput)
    return this.userRepo.findOne(new ObjectId(id))
  }

  remove(id: string) {
    return this.userRepo.delete(id)
  }
}
