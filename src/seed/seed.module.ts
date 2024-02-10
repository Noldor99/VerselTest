import { Module } from '@nestjs/common'
import { SeedService } from './seed.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module'

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([]),
  ],
  providers: [
    SeedService,

  ],
  exports: [SeedService]

})
export class SeedModule { }
