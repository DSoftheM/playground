import { IsFile } from 'src/global/decorators/is-file.decorator';

class UploadAvatarDTO {
  @IsFile({ mime: ['image/jpg'] })
  file: Express.Multer.File;
}
