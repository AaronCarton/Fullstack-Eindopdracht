import { Test, TestingModule } from '@nestjs/testing'
import { ToppingResolver } from './topping.resolver'
import { ToppingService } from './topping.service'

describe('ToppingResolver', () => {
  let resolver: ToppingResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToppingResolver, ToppingService],
    }).compile()

    resolver = module.get<ToppingResolver>(ToppingResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
