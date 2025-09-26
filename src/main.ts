import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // التحقق من البيانات المرسلة (DTOs)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true , forbidNonWhitelisted: true }));

  await app.listen(process.env.PORT || 3001);
  console.log(`🚀 Server is running on ${await app.getUrl()}`);
}
bootstrap();
