import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forFeature(AppConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
