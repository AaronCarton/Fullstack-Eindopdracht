import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const PORT: number = +process.env.PORT || 3003
  await app.listen(PORT)

  console.info(`\n👋 Visit ${await app.getUrl()}/graphql`)
}
bootstrap()
