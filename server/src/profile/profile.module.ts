import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';
import path from 'path';
import { Request } from 'express';

@Module({
  imports: [
    MulterModule.register({
      storage: multer.diskStorage({
        destination: './static/image/',
        filename(req: Request, file, callback) {
          const extension = path.extname(file.originalname);
          callback(null, req.user.id + extension);
        },
      }),
    }),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}

