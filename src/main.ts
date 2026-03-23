import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const port = process.env.PORT ?? 3000
  const apiHost = process.env.API_HOST ?? 'http://localhost:3000'
  const app = await NestFactory.create(AppModule);
  const corsConfig: CorsOptions = {
    origin: ['https://juntosporlosdemas.org','https://www.juntosporlosdemas.org'],  
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,                         
    maxAge: 86400,                             
  };
  console.log(`running on port: ${port}`);
  console.log(`API_HOST: ${apiHost}`);
  app.enableCors(corsConfig);
  await app.listen(port);
}
bootstrap();
