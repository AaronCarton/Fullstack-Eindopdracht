import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  const PORT: number = +process.env.PORT || 3006
  await app.listen(PORT)

  console.info(`\nš Visit ${await app.getUrl()}/graphql`)
}
bootstrap()
