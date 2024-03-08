import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiConfigService } from './app-config/api-config.service';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// if (import.meta.env.PROD) {
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiConfigService = app.get(ApiConfigService);
  const port = apiConfigService.port;

  app.enableCors({ credentials: true, origin: 'http://localhost:5173' });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // await app.listen(port);
}
bootstrap();
// }
export const viteNodeApp = NestFactory.create(AppModule);

viteNodeApp.then((app) => {
  app.enableCors({ credentials: true, origin: 'http://localhost:5173' });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
});
