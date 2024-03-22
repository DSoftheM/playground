import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';
import { GlobalModule } from './global/global-module';
import { EditorModule } from './editor/editor.module';
import { ProfileModule } from './profile/profile.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';
import { serverRoot } from './global/constants';

@Module({
  imports: [
    GlobalModule,
    CatsModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(serverRoot, 'static'),
      serveRoot: '/static',
      serveStaticOptions: {
        fallthrough: true,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'users',
      // logging: true,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    SettingsModule,
    EditorModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // { provide: APP_FILTER, useClass: FilterException }
  ],
})
export class AppModule {}
