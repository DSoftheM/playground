import { Injectable, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiConfigService } from './api-config.service';

interface Environment {
  PORT: string;
  JWT_SIGN_KEY: string;
}

@Injectable()
export class AppConfigService extends ConfigService<Environment, true> {}
