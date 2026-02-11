import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const port = process.env.PORT ?? 3000
  const apiHost = process.env.API_HOST ?? 'http://localhost:3000'
  const app = await NestFactory.create(AppModule);
  const corsConfig: CorsOptions = {
    origin: 'https://juntosporlosdemas.org',   // <- tu dominio exacto
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'X-Requested-With',
    ],
    credentials: true,                         // si usas cookies o auth headers
    maxAge: 86400,                             // cache pre‑flight 24h (opcional)
  };
  console.log(`running on port: ${port}`);
  console.log(`API_HOST: ${apiHost}`);
  app.enableCors(corsConfig);
  await app.listen(port);
}
bootstrap();
