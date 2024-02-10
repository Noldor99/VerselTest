import { Module } from '@nestjs/common'
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path';
import { DatabaseModule } from "./database/database.module";
import { ContactModule } from './contact/contact.module';


@Module({
  controllers: [],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/api',
      rootPath: path.resolve(__dirname, 'static'),
    }),
    DatabaseModule,
    ContactModule
  ]
})

export class AppModule { }
