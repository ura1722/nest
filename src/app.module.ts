import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './profile/entities/profile.entity';
import { PostModule } from './post/post.module';
import { Post } from './post/entities/post.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [User, Profile, Post],
      synchronize: true,
    }),
  
    UserModule,
    ProfileModule,
    PostModule,
    EventEmitterModule.forRoot({
      wildcard: true,       // enables 'user.*' pattern matching
      global: true,         // accessible across all modules         // listeners run asynchronously
      maxListeners: 20,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
