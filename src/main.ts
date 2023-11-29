import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppService } from "./app.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const service = await app.resolve(AppService);
  await service.run();
}
bootstrap();
