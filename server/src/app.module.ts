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
import { MediaViewerModule } from './media-viewer/media-viewer.module';
import { Stats } from 'fs';
import { Response } from 'express';
import { GameCrudModule } from './game-crud/game-crud.module';
import { TodoListModule } from './features/todo-list/todo-list.module';

@Module({
  imports: [
    GlobalModule,
    CatsModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(serverRoot, 'static'),
      serveRoot: '/static',
      serveStaticOptions: {
        fallthrough: true,
        setHeaders(res: Response, pathLine: string, stats: Stats) {
          const type = (() => {
            const t = res.req.query['type'];
            if (t === 'attachment') return 'attachment';
            if (t === 'inline') return 'inline';
            return null;
          })();

          if (!type) return;
          res.set('Content-Disposition', `${type}; filename=${path.basename(pathLine)}`);
        },
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
    MediaViewerModule,
    GameCrudModule,
    TodoListModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // { provide: APP_FILTER, useClass: FilterException }
  ],
})
export class AppModule {}
