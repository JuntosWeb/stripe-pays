import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const port = process.env.PORT ?? 3000
  const apiHost = process.env.API_HOST ?? 'http://localhost:3000'
  const app = await NestFactory.create(AppModule);
  console.log(`running on port: ${port}`);
  console.log(`API_HOST: ${apiHost}`);
  app.enableCors()
  await app.listen(port);
}
bootstrap();
