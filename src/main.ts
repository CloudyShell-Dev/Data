// main.ts
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { loggerConfig } from './config/logger.config';

async function bootstrap() {
 const app = await NestFactory.create(AppModule, {
   logger: loggerConfig,
 });

 const config = new DocumentBuilder()
   .setTitle('Cloudyshell Data')
   .setDescription('API de monitoring pour les créations de Cloudyshell')
   .setVersion('1.0')
   .addBearerAuth()
   .build();

 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api', app, document);

 app.useGlobalPipes(new ValidationPipe());
 
 const port = 3000;
 await app.listen(port);

 console.log(`
🚀 Application is running on: http://localhost:${port}
📚 Swagger documentation available at: http://localhost:${port}/api
🔥 Server successfully started!
 `);
}
bootstrap();