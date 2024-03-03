import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './jwt-guard';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      signOptions: { expiresIn: '7d' },
      secret: '123123123cdvsdv123123cdvsdv123123cdvsdv123123cdvsdv123123cdvsdv123123cdvsdv',
      global: true,
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtGuard }],
})
export class GlobalModule {}
