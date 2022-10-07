import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { DatabaseSeedService } from './seed.service'

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: DatabaseSeedService) {}

  @Command({
    command: 'seed:database',
    describe: 'seed the database',
  })
  async seed() {
    console.log('🌱 Start seeding')
    const t = await this.seedService.addToppings()
    console.log('adding toppings', t)
    const p = await this.seedService.addPizzas()
    console.log('adding pizzas', p)
    const o = await this.seedService.addOrders()
    console.log('adding orders', o)
    console.log('🌱 Seeding done 🏁')
  }

  @Command({
    command: 'seed:reset',
    describe: 'delete all data from the database',
  })
  async delete() {
    console.log('🌱 Start deleting')
    await this.seedService.wipeDatabase()
    console.log('🌱 Deleting done 🏁')
  }
}
