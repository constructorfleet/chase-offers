import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  console.log("Creating application...");
  const app = await NestFactory.create(AppModule);
  console.log("Resolving service...");
  const service = await app.resolve(AppService);
  console.log("Running...");
  await service.run()
}
bootstrap();
