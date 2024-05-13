import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from './auth/auth.module';
import app from '../config/app';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [app],
    }),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
