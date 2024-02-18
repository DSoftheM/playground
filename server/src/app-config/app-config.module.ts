import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiConfigService } from './api-config.service';
import { AppConfigService } from './app-config.service';

const configFactory = () => ({
  user: {
    name: 'Alex',
  },
});

@Module({
  providers: [AppConfigService, ApiConfigService],
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configFactory] })],
  exports: [AppConfigService, ApiConfigService],
})
export class AppConfigModule {}
