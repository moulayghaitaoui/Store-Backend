import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // إعدادات التوثيق
  const config = new DocumentBuilder()
    .setTitle('Store API')              // العنوان
    .setDescription('API for Store')   // وصف المشروع
    .setVersion('1.0')                 // الإصدار
    .addBearerAuth()                   // لدعم JWT
    .build();

  // إنشاء الوثيقة وربطها بالتطبيق
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // الرابط: http://localhost:3000/api/docs


  // التحقق من البيانات المرسلة (DTOs)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true , forbidNonWhitelisted: true }));

  await app.listen(process.env.PORT || 3001);
  console.log(`🚀 Server is running on ${await app.getUrl()}`);
}
bootstrap();
