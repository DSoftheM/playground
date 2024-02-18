import { Injectable } from '@nestjs/common';
import { AppConfigService } from './app-config.service';

@Injectable()
export class ApiConfigService {
  constructor(private configService: AppConfigService) {}

  get getJwtSignKey() {
    return this.configService.get('JWT_SIGN_KEY');
  }

  get port() {
    return this.configService.get('PORT');
  }
}
