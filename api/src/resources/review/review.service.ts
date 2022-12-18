import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { Review } from './entities/review.entity'
import { CreateReviewInput } from './dto/create-review.input'
import { UpdateReviewInput } from './dto/update-review.input'

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
  ) {}

  create(customerId: string, createReviewInput: CreateReviewInput) {
    return this.reviewRepo.save({ ...createReviewInput, customerId })
  }

  findAll() {
    return this.reviewRepo.find()
  }

  findOne(id: string) {
    return this.reviewRepo.findOne(new ObjectId(id))
  }

  update(id: string, updateReviewInput: UpdateReviewInput) {
    return this.reviewRepo.update(id, updateReviewInput)
  }

  remove(id: string) {
    return this.reviewRepo.delete(id)
  }
}
