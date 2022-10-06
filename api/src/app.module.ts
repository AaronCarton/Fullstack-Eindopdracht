import { Module } from '@nestjs/common'
import { BootstrapModule } from './bootstrap/bootstrap.module'

@Module({
  imports: [BootstrapModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
