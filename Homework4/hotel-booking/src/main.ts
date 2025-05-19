import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Hotel Room Booking API')
    .setDescription('API for managing hotel room bookings')
    .setVersion('1.0')
    .addTag('rooms')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('Application running on http://localhost:3000');
  console.log('Swagger docs at http://localhost:3000/api');
}
bootstrap();





