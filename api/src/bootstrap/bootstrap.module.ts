import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { DataSource } from 'typeorm'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      sortSchema: true,
      autoSchemaFile: true,
      // formatError: (error) => {
      //   const graphQLFormattedError = {
      //     name: error.name,
      //     message: error.message,
      //     code: error.extensions?.code || 'SERVER_ERROR',
      //     stacktrace: error.extensions?.exception?.stacktrace || [],
      //   }
      //   return graphQLFormattedError
      // },
    }),

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mongodb',
        url: process.env.MONGO_URI,
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true, // Careful with this in production
        useNewUrlParser: true,
        useUnifiedTopology: true, // Disable deprecated warnings
      }),

      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize()
        return dataSource
      },
    }),
  ],
})
export class BootstrapModule {}
