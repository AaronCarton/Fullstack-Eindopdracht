import { Test, TestingModule } from '@nestjs/testing'
import { PizzaResolver } from './pizza.resolver'
import { PizzaService } from './pizza.service'

describe('PizzaResolver', () => {
  let resolver: PizzaResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PizzaResolver, PizzaService],
    }).compile()

    resolver = module.get<PizzaResolver>(PizzaResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
