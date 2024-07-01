import { Reflector, APP_GUARD, NestFactory } from '@nestjs/core';
import { SetMetadata, Injectable, Get, Controller, BadRequestException, Post, Body, Query, Module, Res, HttpStatus, createParamDecorator, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Param, ConfigurableModuleBuilder, Inject, ValidationPipe } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn, Repository, CreateDateColumn } from 'typeorm';
import { IsString, Length, IsBoolean, IsNumber, IsDateString } from 'class-validator';
import { JwtService, JwtModule } from '@nestjs/jwt';
import e from 'express';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import hbs from 'handlebars';
import puppeteer from 'puppeteer';
import * as fs from 'fs/promises';
import fs__default from 'fs/promises';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import multer from 'multer';
import path$1 from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import cookieParser from 'cookie-parser';

const SetPublicKey = 'SetPublicKey';
function SetPublic() {
    return SetMetadata(SetPublicKey, true);
}

function _ts_decorate$S(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$y(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class CustomPipe {
    transform(value, metadata) {
        console.log('value :>> ', value);
        console.log('metadata :>> ', metadata);
        return value;
    }
}
CustomPipe = _ts_decorate$S([
    Injectable()
], CustomPipe);
class AppController {
    getIndex() {
        return 123;
    }
}
_ts_decorate$S([
    SetPublic(),
    Get('/'),
    _ts_metadata$y("design:type", Function),
    _ts_metadata$y("design:paramtypes", []),
    _ts_metadata$y("design:returntype", void 0)
], AppController.prototype, "getIndex", null);
AppController = _ts_decorate$S([
    Controller()
], AppController);

function _ts_decorate$R(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class AppService {
    getHello() {
        return 'Hello World!';
    }
}
AppService = _ts_decorate$R([
    Injectable()
], AppService);

function _ts_decorate$Q(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class AppConfigService extends ConfigService {
}
AppConfigService = _ts_decorate$Q([
    Injectable()
], AppConfigService);

function _define_property$x(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$P(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$x(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class ApiConfigService {
    get getJwtSignKey() {
        return this.configService.get('JWT_SIGN_KEY');
    }
    get port() {
        return this.configService.get('PORT');
    }
    constructor(configService){
        _define_property$x(this, "configService", void 0);
        this.configService = configService;
    }
}
ApiConfigService = _ts_decorate$P([
    Injectable(),
    _ts_metadata$x("design:type", Function),
    _ts_metadata$x("design:paramtypes", [
        typeof AppConfigService === "undefined" ? Object : AppConfigService
    ])
], ApiConfigService);

function _define_property$w(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$O(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$w(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class UserSchema {
    constructor(){
        _define_property$w(this, "id", void 0);
        _define_property$w(this, "login", void 0 //  unique: true,
        );
        _define_property$w(this, "password", void 0);
    }
}
_ts_decorate$O([
    PrimaryGeneratedColumn(),
    _ts_metadata$w("design:type", Number)
], UserSchema.prototype, "id", void 0);
_ts_decorate$O([
    Column(),
    _ts_metadata$w("design:type", String)
], UserSchema.prototype, "login", void 0);
_ts_decorate$O([
    Column(),
    _ts_metadata$w("design:type", String)
], UserSchema.prototype, "password", void 0);
UserSchema = _ts_decorate$O([
    Entity('users')
], UserSchema);

function _define_property$v(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$N(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$v(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class CatSchema {
    constructor(){
        _define_property$v(this, "id", void 0);
        _define_property$v(this, "firstName", void 0);
        _define_property$v(this, "isActive", void 0);
        _define_property$v(this, "lastName", void 0);
        _define_property$v(this, "master", void 0);
    }
}
_ts_decorate$N([
    PrimaryGeneratedColumn('uuid'),
    _ts_metadata$v("design:type", String)
], CatSchema.prototype, "id", void 0);
_ts_decorate$N([
    Column(),
    _ts_metadata$v("design:type", String)
], CatSchema.prototype, "firstName", void 0);
_ts_decorate$N([
    Column(),
    _ts_metadata$v("design:type", Boolean)
], CatSchema.prototype, "isActive", void 0);
_ts_decorate$N([
    Column(),
    _ts_metadata$v("design:type", String)
], CatSchema.prototype, "lastName", void 0);
_ts_decorate$N([
    OneToOne((type)=>UserSchema),
    JoinColumn(),
    _ts_metadata$v("design:type", typeof IUser === "undefined" ? Object : IUser)
], CatSchema.prototype, "master", void 0);
CatSchema = _ts_decorate$N([
    Entity('cats')
], CatSchema);

function _define_property$u(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$M(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$u(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$d(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
class CatsService {
    async findAll() {
        return this.catsRepository.find({
            relations: {
                master: true
            }
        });
    }
    async findOne(id) {
        return this.catsRepository.findOneBy({
            id
        });
    }
    async remove(id) {
        return this.catsRepository.delete(id);
    }
    async create(cat) {
        const master = await this.usersRepository.findOneBy({
            id: cat.masterId
        });
        if (!master) throw new BadRequestException();
        const createdCat = await this.catsRepository.save({
            firstName: cat.firstName,
            isActive: cat.isActive,
            lastName: cat.lastName,
            master: master
        });
        return createdCat.id;
    }
    async delete(catId) {
        this.catsRepository.delete(catId);
    }
    constructor(apiConfigService, catsRepository, usersRepository){
        _define_property$u(this, "apiConfigService", void 0);
        _define_property$u(this, "catsRepository", void 0);
        _define_property$u(this, "usersRepository", void 0);
        this.apiConfigService = apiConfigService;
        this.catsRepository = catsRepository;
        this.usersRepository = usersRepository;
    }
}
CatsService = _ts_decorate$M([
    Injectable(),
    _ts_param$d(1, InjectRepository(CatSchema)),
    _ts_param$d(2, InjectRepository(UserSchema)),
    _ts_metadata$u("design:type", Function),
    _ts_metadata$u("design:paramtypes", [
        typeof ApiConfigService === "undefined" ? Object : ApiConfigService,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository
    ])
], CatsService);

function _define_property$t(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$L(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$t(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class CreateCatDto {
    constructor(){
        _define_property$t(this, "firstName", void 0);
        _define_property$t(this, "lastName", void 0);
        _define_property$t(this, "isActive", void 0);
        _define_property$t(this, "masterId", void 0);
    }
}
_ts_decorate$L([
    IsString(),
    Length(2, 30, {
        message: 'Длина имени должна быть от 2 до 30 символов'
    }),
    _ts_metadata$t("design:type", String)
], CreateCatDto.prototype, "firstName", void 0);
_ts_decorate$L([
    IsString(),
    Length(2, 30, {
        message: 'Длина фамилии должна быть от 2 до 30 символов'
    }),
    _ts_metadata$t("design:type", String)
], CreateCatDto.prototype, "lastName", void 0);
_ts_decorate$L([
    IsBoolean(),
    _ts_metadata$t("design:type", Boolean)
], CreateCatDto.prototype, "isActive", void 0);
_ts_decorate$L([
    IsNumber(),
    _ts_metadata$t("design:type", Number)
], CreateCatDto.prototype, "masterId", void 0);

function _define_property$s(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$K(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$s(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$c(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
class CatsController {
    getAll() {
        return this.catsService.findAll();
    }
    async create(user) {
        return await this.catsService.create(user);
    }
    deleteUser(id) {
        return this.catsService.delete(id);
    }
    constructor(catsService){
        _define_property$s(this, "catsService", void 0);
        this.catsService = catsService;
    }
}
_ts_decorate$K([
    Get('/'),
    _ts_metadata$s("design:type", Function),
    _ts_metadata$s("design:paramtypes", []),
    _ts_metadata$s("design:returntype", void 0)
], CatsController.prototype, "getAll", null);
_ts_decorate$K([
    Post('/create'),
    _ts_param$c(0, Body()),
    _ts_metadata$s("design:type", Function),
    _ts_metadata$s("design:paramtypes", [
        typeof CreateCatDto === "undefined" ? Object : CreateCatDto
    ]),
    _ts_metadata$s("design:returntype", Promise)
], CatsController.prototype, "create", null);
_ts_decorate$K([
    Get('/delete'),
    _ts_param$c(0, Query('id')),
    _ts_metadata$s("design:type", Function),
    _ts_metadata$s("design:paramtypes", [
        String
    ]),
    _ts_metadata$s("design:returntype", void 0)
], CatsController.prototype, "deleteUser", null);
CatsController = _ts_decorate$K([
    Controller('cats'),
    _ts_metadata$s("design:type", Function),
    _ts_metadata$s("design:paramtypes", [
        typeof CatsService === "undefined" ? Object : CatsService
    ])
], CatsController);

function _ts_decorate$J(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const configFactory = ()=>({
        user: {
            name: 'Alex'
        }
    });
class AppConfigModule {
}
AppConfigModule = _ts_decorate$J([
    Module({
        providers: [
            AppConfigService,
            ApiConfigService
        ],
        imports: [
            ConfigModule.forRoot({
                isGlobal: true,
                load: [
                    configFactory
                ]
            })
        ],
        exports: [
            AppConfigService,
            ApiConfigService
        ]
    })
], AppConfigModule);

function _ts_decorate$I(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class CatsModule {
}
CatsModule = _ts_decorate$I([
    Module({
        imports: [
            AppConfigModule,
            TypeOrmModule.forFeature([
                CatSchema,
                UserSchema
            ])
        ],
        controllers: [
            CatsController
        ],
        providers: [
            CatsService
        ]
    })
], CatsModule);

function _define_property$r(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$H(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$r(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class RegisterUserDTO {
    constructor(){
        _define_property$r(this, "login", void 0);
        _define_property$r(this, "password", void 0);
    }
}
_ts_decorate$H([
    IsString(),
    _ts_metadata$r("design:type", String)
], RegisterUserDTO.prototype, "login", void 0);
_ts_decorate$H([
    IsString(),
    _ts_metadata$r("design:type", String)
], RegisterUserDTO.prototype, "password", void 0);

function _define_property$q(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$G(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$q(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class LoginUserDTO {
    constructor(){
        _define_property$q(this, "login", void 0);
        _define_property$q(this, "password", void 0);
    }
}
_ts_decorate$G([
    IsString(),
    _ts_metadata$q("design:type", String)
], LoginUserDTO.prototype, "login", void 0);
_ts_decorate$G([
    IsString(),
    _ts_metadata$q("design:type", String)
], LoginUserDTO.prototype, "password", void 0);

function _define_property$p(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$F(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$p(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$b(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
class UsersService {
    async register(registerUserDTO) {
        await this.userRepository.save([
            registerUserDTO
        ]);
    }
    async getUserByLogin(login) {
        return this.userRepository.findOneBy({
            login
        });
    }
    async getAllUsers() {
        return this.userRepository.find();
    }
    constructor(userRepository){
        _define_property$p(this, "userRepository", void 0);
        this.userRepository = userRepository;
    }
}
UsersService = _ts_decorate$F([
    Injectable(),
    _ts_param$b(0, InjectRepository(UserSchema)),
    _ts_metadata$p("design:type", Function),
    _ts_metadata$p("design:paramtypes", [
        typeof Repository === "undefined" ? Object : Repository
    ])
], UsersService);

function _define_property$o(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$E(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$o(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class AuthService {
    async registerUser(registerUserDTO) {
        return this.usersService.register(registerUserDTO);
    }
    async loginUser(loginUserDTO) {
        const user = await this.usersService.getUserByLogin(loginUserDTO.login);
        if (!user) {
            throw new BadRequestException('Такого пользователя не существует'); // "Такого пользователя не существует"
        }
        if (user.password !== loginUserDTO.password) {
            throw new BadRequestException('Неправильный пароль');
        }
        const { password, ...restUser } = user;
        const access_token = this.jwtService.sign(restUser);
        // const refresh_token = this.jwtService.sign(restUser, { secret: 'секрет для рефреша' });
        return {
            access_token
        };
    }
    constructor(usersService, jwtService){
        _define_property$o(this, "usersService", void 0);
        _define_property$o(this, "jwtService", void 0);
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
}
AuthService = _ts_decorate$E([
    Injectable(),
    _ts_metadata$o("design:type", Function),
    _ts_metadata$o("design:paramtypes", [
        typeof UsersService === "undefined" ? Object : UsersService,
        typeof JwtService === "undefined" ? Object : JwtService
    ])
], AuthService);

function _define_property$n(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$D(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$n(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$a(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
class AuthController {
    registerUser(registerUserDTO) {
        this.authService.registerUser(registerUserDTO);
    }
    async loginUser(loginUserDTO, res) {
        try {
            const { access_token } = await this.authService.loginUser(loginUserDTO);
            res.setHeader('Set-Cookie', createCookie('access_token', access_token, {
                HttpOnly: true,
                expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000)
            })).end();
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).write(error.message);
            res.end();
        }
        return {};
    }
    async logoutUser(res) {
        res.setHeader('Set-Cookie', createCookie('access_token', '', {
            HttpOnly: true,
            'max-age': -1
        })).end();
    }
    constructor(authService){
        _define_property$n(this, "authService", void 0);
        this.authService = authService;
    }
}
_ts_decorate$D([
    Post('/register'),
    SetPublic(),
    _ts_param$a(0, Body()),
    _ts_metadata$n("design:type", Function),
    _ts_metadata$n("design:paramtypes", [
        typeof RegisterUserDTO === "undefined" ? Object : RegisterUserDTO
    ]),
    _ts_metadata$n("design:returntype", void 0)
], AuthController.prototype, "registerUser", null);
_ts_decorate$D([
    Post('/login'),
    SetPublic(),
    _ts_param$a(0, Body()),
    _ts_param$a(1, Res()),
    _ts_metadata$n("design:type", Function),
    _ts_metadata$n("design:paramtypes", [
        typeof LoginUserDTO === "undefined" ? Object : LoginUserDTO,
        typeof e === "undefined" || typeof e.Response === "undefined" ? Object : e.Response
    ]),
    _ts_metadata$n("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
_ts_decorate$D([
    Get('/logout'),
    _ts_param$a(0, Res()),
    _ts_metadata$n("design:type", Function),
    _ts_metadata$n("design:paramtypes", [
        typeof e === "undefined" || typeof e.Response === "undefined" ? Object : e.Response
    ]),
    _ts_metadata$n("design:returntype", Promise)
], AuthController.prototype, "logoutUser", null);
AuthController = _ts_decorate$D([
    Controller('auth'),
    _ts_metadata$n("design:type", Function),
    _ts_metadata$n("design:paramtypes", [
        typeof AuthService === "undefined" ? Object : AuthService
    ])
], AuthController);
function createCookie(name, value, options) {
    options = {
        ...options,
        path: '/'
    };
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    for(const optionKey in options){
        updatedCookie += '; ' + optionKey;
        const optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += '=' + optionValue;
        }
    }
    return updatedCookie;
}

function _define_property$m(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$C(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$m(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class UsersController {
    getAllUsers() {
        return this.usersService.getAllUsers();
    }
    constructor(usersService){
        _define_property$m(this, "usersService", void 0);
        this.usersService = usersService;
    }
}
_ts_decorate$C([
    Get('/'),
    _ts_metadata$m("design:type", Function),
    _ts_metadata$m("design:paramtypes", []),
    _ts_metadata$m("design:returntype", void 0)
], UsersController.prototype, "getAllUsers", null);
UsersController = _ts_decorate$C([
    Controller('/users'),
    _ts_metadata$m("design:type", Function),
    _ts_metadata$m("design:paramtypes", [
        typeof UsersService === "undefined" ? Object : UsersService
    ])
], UsersController);

function _ts_decorate$B(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class UsersModule {
}
UsersModule = _ts_decorate$B([
    Module({
        imports: [
            TypeOrmModule.forFeature([
                UserSchema
            ])
        ],
        controllers: [
            UsersController
        ],
        providers: [
            UsersService
        ],
        exports: [
            UsersService
        ]
    })
], UsersModule);

function _ts_decorate$A(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class AuthModule {
}
AuthModule = _ts_decorate$A([
    Module({
        imports: [
            UsersModule,
            TypeOrmModule.forFeature([
                UserSchema
            ])
        ],
        controllers: [
            AuthController
        ],
        providers: [
            AuthService
        ]
    })
], AuthModule);

const ReqUser = createParamDecorator((data, ctx)=>{
    return ctx.switchToHttp().getRequest().user;
});

function _define_property$l(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$z(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$l(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class UserDTO {
    constructor(){
        _define_property$l(this, "login", void 0);
        _define_property$l(this, "id", void 0);
        _define_property$l(this, "url", void 0);
    }
}
_ts_decorate$z([
    IsString(),
    _ts_metadata$l("design:type", String)
], UserDTO.prototype, "login", void 0);
_ts_decorate$z([
    IsNumber(),
    _ts_metadata$l("design:type", Number)
], UserDTO.prototype, "id", void 0);

// @ts-ignore
const globalFolderPath = dirname(fileURLToPath(import.meta.url));
const serverRoot = path.resolve(globalFolderPath, '..', '..');
const PATH = {
    static: {
        image: (id)=>`/static/image/${id}.jpg`
    }
};

function _define_property$k(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$y(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$k(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$9(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
class SettingsController {
    async getProfile(commonUser) {
        const user = await this.usersService.getUserByLogin(commonUser.login);
        if (!user) throw new BadRequestException();
        return {
            id: user.id,
            login: user.login,
            url: PATH.static.image(user.id)
        };
    }
    constructor(usersService){
        _define_property$k(this, "usersService", void 0);
        this.usersService = usersService;
    }
}
_ts_decorate$y([
    Get('/profile'),
    _ts_param$9(0, ReqUser()),
    _ts_metadata$k("design:type", Function),
    _ts_metadata$k("design:paramtypes", [
        typeof UserDTO === "undefined" ? Object : UserDTO
    ]),
    _ts_metadata$k("design:returntype", Promise)
], SettingsController.prototype, "getProfile", null);
SettingsController = _ts_decorate$y([
    Controller('settings'),
    _ts_metadata$k("design:type", Function),
    _ts_metadata$k("design:paramtypes", [
        typeof UsersService === "undefined" ? Object : UsersService
    ])
], SettingsController);

function _ts_decorate$x(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class SettingsService {
}
SettingsService = _ts_decorate$x([
    Injectable()
], SettingsService);

function _ts_decorate$w(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class SettingsModule {
}
SettingsModule = _ts_decorate$w([
    Module({
        imports: [
            UsersModule
        ],
        controllers: [
            SettingsController
        ],
        providers: [
            SettingsService
        ]
    })
], SettingsModule);

function _define_property$j(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$v(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$j(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class JwtGuard {
    async canActivate(context) {
        return true;
    // const isPublic = this.reflector.get<boolean>(SetPublicKey, context.getHandler());
    // if (isPublic) return true;
    // const req = context.switchToHttp().getRequest<Request>();
    // const jwtToken = req.cookies.access_token ?? '';
    // if (!jwtToken) return false;
    // const user = await this.jwtService.verifyAsync(jwtToken);
    // if (!user) return false;
    // const { iat, exp, ...restUser } = user;
    // // @ts-ignore
    // req.user = restUser;
    // return true;
    }
    constructor(jwtService, reflector){
        _define_property$j(this, "jwtService", void 0);
        _define_property$j(this, "reflector", void 0);
        this.jwtService = jwtService;
        this.reflector = reflector;
    }
}
JwtGuard = _ts_decorate$v([
    Injectable(),
    _ts_metadata$j("design:type", Function),
    _ts_metadata$j("design:paramtypes", [
        typeof JwtService === "undefined" ? Object : JwtService,
        typeof Reflector === "undefined" ? Object : Reflector
    ])
], JwtGuard);

function _ts_decorate$u(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class GlobalModule {
}
GlobalModule = _ts_decorate$u([
    Module({
        imports: [
            JwtModule.register({
                signOptions: {
                    expiresIn: '7d'
                },
                secret: '123123123cdvsdv123123cdvsdv123123cdvsdv123123cdvsdv123123cdvsdv123123cdvsdv',
                global: true
            })
        ],
        providers: [
            {
                provide: APP_GUARD,
                useClass: JwtGuard
            }
        ]
    })
], GlobalModule);

function _define_property$i(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$t(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$i(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class EditorContextEntity {
    constructor(){
        _define_property$i(this, "id", void 0);
        _define_property$i(this, "userId", void 0);
        _define_property$i(this, "name", void 0);
        _define_property$i(this, "value", void 0);
    }
}
_ts_decorate$t([
    PrimaryGeneratedColumn('uuid'),
    _ts_metadata$i("design:type", String)
], EditorContextEntity.prototype, "id", void 0);
_ts_decorate$t([
    Column(),
    _ts_metadata$i("design:type", Number)
], EditorContextEntity.prototype, "userId", void 0);
_ts_decorate$t([
    Column(),
    _ts_metadata$i("design:type", String)
], EditorContextEntity.prototype, "name", void 0);
_ts_decorate$t([
    Column(),
    _ts_metadata$i("design:type", String)
], EditorContextEntity.prototype, "value", void 0);
EditorContextEntity = _ts_decorate$t([
    Entity({
        name: 'editorContext'
    })
], EditorContextEntity);

function _define_property$h(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$s(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$h(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$8(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function contextToRecord(context) {
    return context.reduce((record, item)=>{
        record[item.name] = item.value;
        return record;
    }, {});
}
class EditorService {
    async saveContext(userId, context) {
        const data = Object.keys(context).map((name)=>({
                name,
                value: context[name],
                userId
            }));
        await this.contextRepository.delete({
            userId
        });
        await this.contextRepository.save(data);
    }
    async getContext(userId) {
        return this.contextRepository.find({
            where: {
                userId
            }
        }).then(contextToRecord);
    }
    async getHtmlFromTemplate(userId, templateString) {
        const template = hbs.compile(templateString);
        const context = await this.contextRepository.find({
            where: {
                userId
            }
        });
        return template(contextToRecord(context));
    }
    async getPdfFromTemplate(userId, templateString) {
        const html = await this.getHtmlFromTemplate(userId, templateString);
        await this.page.setContent(html, {
            waitUntil: 'domcontentloaded'
        });
        const pdf = await this.page.pdf();
        await fs.writeFile('./test.pdf', pdf);
        return pdf;
    }
    constructor(contextRepository){
        _define_property$h(this, "contextRepository", void 0);
        _define_property$h(this, "page", void 0);
        this.contextRepository = contextRepository;
        puppeteer.launch().then((browser)=>browser.newPage()).then((page)=>{
            this.page = page;
        });
    }
}
EditorService = _ts_decorate$s([
    Injectable(),
    _ts_param$8(0, InjectRepository(EditorContextEntity)),
    _ts_metadata$h("design:type", Function),
    _ts_metadata$h("design:paramtypes", [
        typeof Repository === "undefined" ? Object : Repository
    ])
], EditorService);

function _define_property$g(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$r(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$g(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class EditorTemplateDto {
    constructor(){
        _define_property$g(this, "text", void 0);
    }
}
_ts_decorate$r([
    IsString(),
    _ts_metadata$g("design:type", String)
], EditorTemplateDto.prototype, "text", void 0);

function _define_property$f(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$q(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$f(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$7(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
class EditorController {
    getHtmlFromTemplate(template, user) {
        return this.editorService.getHtmlFromTemplate(user.id, template.text);
    }
    getPdfFromTemplate(template, user) {
        return this.editorService.getPdfFromTemplate(user.id, template.text);
    }
    async saveEditorContext(context, user) {
        await this.editorService.saveContext(user.id, context);
    }
    async getEditorContext(user) {
        return await this.editorService.getContext(user.id);
    }
    constructor(editorService){
        _define_property$f(this, "editorService", void 0);
        this.editorService = editorService;
    }
}
_ts_decorate$q([
    Post('getHtml'),
    _ts_param$7(0, Body()),
    _ts_param$7(1, ReqUser()),
    _ts_metadata$f("design:type", Function),
    _ts_metadata$f("design:paramtypes", [
        typeof EditorTemplateDto === "undefined" ? Object : EditorTemplateDto,
        typeof UserDTO === "undefined" ? Object : UserDTO
    ]),
    _ts_metadata$f("design:returntype", void 0)
], EditorController.prototype, "getHtmlFromTemplate", null);
_ts_decorate$q([
    Post('getPdf'),
    _ts_param$7(0, Body()),
    _ts_param$7(1, ReqUser()),
    _ts_metadata$f("design:type", Function),
    _ts_metadata$f("design:paramtypes", [
        typeof EditorTemplateDto === "undefined" ? Object : EditorTemplateDto,
        typeof UserDTO === "undefined" ? Object : UserDTO
    ]),
    _ts_metadata$f("design:returntype", void 0)
], EditorController.prototype, "getPdfFromTemplate", null);
_ts_decorate$q([
    Post('saveContext'),
    _ts_param$7(0, Body('context')),
    _ts_param$7(1, ReqUser()),
    _ts_metadata$f("design:type", Function),
    _ts_metadata$f("design:paramtypes", [
        typeof Record === "undefined" ? Object : Record,
        typeof UserDTO === "undefined" ? Object : UserDTO
    ]),
    _ts_metadata$f("design:returntype", Promise)
], EditorController.prototype, "saveEditorContext", null);
_ts_decorate$q([
    Get('getContext'),
    _ts_param$7(0, ReqUser()),
    _ts_metadata$f("design:type", Function),
    _ts_metadata$f("design:paramtypes", [
        typeof UserDTO === "undefined" ? Object : UserDTO
    ]),
    _ts_metadata$f("design:returntype", Promise)
], EditorController.prototype, "getEditorContext", null);
EditorController = _ts_decorate$q([
    SetPublic(),
    Controller('/editor'),
    _ts_metadata$f("design:type", Function),
    _ts_metadata$f("design:paramtypes", [
        typeof EditorService === "undefined" ? Object : EditorService
    ])
], EditorController);

function _ts_decorate$p(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class EditorModule {
}
EditorModule = _ts_decorate$p([
    Module({
        imports: [
            TypeOrmModule.forFeature([
                EditorContextEntity
            ])
        ],
        controllers: [
            EditorController
        ],
        providers: [
            EditorService
        ]
    })
], EditorModule);

function _ts_decorate$o(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$e(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$6(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
class ProfileController {
    setAvatar(file) {}
}
_ts_decorate$o([
    Post('uploadAvatar'),
    UseInterceptors(FileInterceptor('file')),
    _ts_param$6(0, UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({
                maxSize: 1000 * 500
            }),
            new FileTypeValidator({
                fileType: 'image/*'
            })
        ]
    }))),
    _ts_metadata$e("design:type", Function),
    _ts_metadata$e("design:paramtypes", [
        typeof Express === "undefined" || typeof Express.Multer === "undefined" || typeof Express.Multer.File === "undefined" ? Object : Express.Multer.File
    ]),
    _ts_metadata$e("design:returntype", void 0)
], ProfileController.prototype, "setAvatar", null);
ProfileController = _ts_decorate$o([
    Controller('profile')
], ProfileController);

function _ts_decorate$n(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class ProfileService {
}
ProfileService = _ts_decorate$n([
    Injectable()
], ProfileService);

function _ts_decorate$m(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class ProfileModule {
}
ProfileModule = _ts_decorate$m([
    Module({
        imports: [
            MulterModule.register({
                storage: multer.diskStorage({
                    destination: './static/image/',
                    filename (req, file, callback) {
                        const extension = path$1.extname(file.originalname);
                        callback(null, req.user.id + extension);
                    }
                })
            })
        ],
        controllers: [
            ProfileController
        ],
        providers: [
            ProfileService
        ]
    })
], ProfileModule);

var MediaViewerMediaType;
(function(MediaViewerMediaType) {
    MediaViewerMediaType["Link"] = "link";
    MediaViewerMediaType["Stream"] = "stream";
})(MediaViewerMediaType || (MediaViewerMediaType = {}));

function _ts_decorate$l(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class MediaViewerService {
    async getPdf(type) {
        const path = '/static/pdf/sample.pdf';
        if (type === MediaViewerMediaType.Link) return path;
        if (type === MediaViewerMediaType.Stream) {
            return await fs__default.readFile(`.${path}`, {
                encoding: 'binary'
            });
        }
    }
}
MediaViewerService = _ts_decorate$l([
    Injectable()
], MediaViewerService);

function _define_property$e(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$k(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$d(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$5(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
class MediaViewerController {
    getPdf(type) {
        return this.mediaViewerService.getPdf(type);
    }
    constructor(mediaViewerService){
        _define_property$e(this, "mediaViewerService", void 0);
        this.mediaViewerService = mediaViewerService;
    }
}
_ts_decorate$k([
    Get('/getPdf'),
    _ts_param$5(0, Query('type')),
    _ts_metadata$d("design:type", Function),
    _ts_metadata$d("design:paramtypes", [
        typeof MediaViewerMediaType === "undefined" ? Object : MediaViewerMediaType
    ]),
    _ts_metadata$d("design:returntype", void 0)
], MediaViewerController.prototype, "getPdf", null);
MediaViewerController = _ts_decorate$k([
    Controller('mediaViewer'),
    _ts_metadata$d("design:type", Function),
    _ts_metadata$d("design:paramtypes", [
        typeof MediaViewerService === "undefined" ? Object : MediaViewerService
    ])
], MediaViewerController);

function _ts_decorate$j(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class MediaViewerModule {
}
MediaViewerModule = _ts_decorate$j([
    Module({
        controllers: [
            MediaViewerController
        ],
        providers: [
            MediaViewerService
        ]
    })
], MediaViewerModule);

function _define_property$d(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$i(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$c(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class CreatePlayerDto {
    constructor(){
        _define_property$d(this, "name", void 0);
    }
}
_ts_decorate$i([
    IsString(),
    Length(4, 40),
    _ts_metadata$c("design:type", String)
], CreatePlayerDto.prototype, "name", void 0);

function _define_property$c(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$h(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$b(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class CreatePlayerEntity {
    constructor(){
        _define_property$c(this, "id", void 0);
        _define_property$c(this, "name", void 0);
    }
}
_ts_decorate$h([
    PrimaryGeneratedColumn('uuid'),
    _ts_metadata$b("design:type", String)
], CreatePlayerEntity.prototype, "id", void 0);
_ts_decorate$h([
    Column(),
    _ts_metadata$b("design:type", String)
], CreatePlayerEntity.prototype, "name", void 0);
CreatePlayerEntity = _ts_decorate$h([
    Entity({
        name: 'game-crud'
    })
], CreatePlayerEntity);

function _define_property$b(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$g(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$a(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$4(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
class GameCrudService {
    createPlayer(player) {
        this.playerRepository.save(player);
    }
    getAllPlayers() {
        return this.playerRepository.find();
    }
    deletePlayer(id) {
        this.playerRepository.delete({
            id
        });
    }
    findPlayer(id) {
        return this.playerRepository.findOneBy({
            id
        });
    }
    constructor(playerRepository){
        _define_property$b(this, "playerRepository", void 0);
        this.playerRepository = playerRepository;
    }
}
GameCrudService = _ts_decorate$g([
    Injectable(),
    _ts_param$4(0, InjectRepository(CreatePlayerEntity)),
    _ts_metadata$a("design:type", Function),
    _ts_metadata$a("design:paramtypes", [
        typeof Repository === "undefined" ? Object : Repository
    ])
], GameCrudService);

function _define_property$a(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$f(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$9(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class DeletePlayerDto {
    constructor(){
        _define_property$a(this, "playerId", void 0);
    }
}
_ts_decorate$f([
    IsString(),
    _ts_metadata$9("design:type", String)
], DeletePlayerDto.prototype, "playerId", void 0);

function _define_property$9(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$e(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$8(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$3(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
class GameCrudController {
    createPlayer(player, file) {
        return this.gameCrudService.createPlayer(player);
    }
    getAllPlayers() {
        return this.gameCrudService.getAllPlayers();
    }
    deletePlayer(dto) {
        this.gameCrudService.deletePlayer(dto.playerId);
    }
    getPlayer(playerId) {
        return this.gameCrudService.findPlayer(playerId);
    }
    constructor(gameCrudService){
        _define_property$9(this, "gameCrudService", void 0);
        this.gameCrudService = gameCrudService;
    }
}
_ts_decorate$e([
    Post('/createPlayer'),
    SetPublic(),
    UseInterceptors(FileInterceptor('avatar')),
    _ts_param$3(0, Body()),
    _ts_param$3(1, UploadedFile()),
    _ts_metadata$8("design:type", Function),
    _ts_metadata$8("design:paramtypes", [
        typeof CreatePlayerDto === "undefined" ? Object : CreatePlayerDto,
        typeof Express === "undefined" || typeof Express.Multer === "undefined" || typeof Express.Multer.File === "undefined" ? Object : Express.Multer.File
    ]),
    _ts_metadata$8("design:returntype", void 0)
], GameCrudController.prototype, "createPlayer", null);
_ts_decorate$e([
    Get('/getAllPlayers'),
    SetPublic(),
    _ts_metadata$8("design:type", Function),
    _ts_metadata$8("design:paramtypes", []),
    _ts_metadata$8("design:returntype", void 0)
], GameCrudController.prototype, "getAllPlayers", null);
_ts_decorate$e([
    Post('/deletePlayer'),
    _ts_param$3(0, Body()),
    _ts_metadata$8("design:type", Function),
    _ts_metadata$8("design:paramtypes", [
        typeof DeletePlayerDto === "undefined" ? Object : DeletePlayerDto
    ]),
    _ts_metadata$8("design:returntype", void 0)
], GameCrudController.prototype, "deletePlayer", null);
_ts_decorate$e([
    Get('/getPlayer/:playerId'),
    _ts_param$3(0, Param('playerId')),
    _ts_metadata$8("design:type", Function),
    _ts_metadata$8("design:paramtypes", [
        String
    ]),
    _ts_metadata$8("design:returntype", void 0)
], GameCrudController.prototype, "getPlayer", null);
GameCrudController = _ts_decorate$e([
    Controller('game-crud'),
    _ts_metadata$8("design:type", Function),
    _ts_metadata$8("design:paramtypes", [
        typeof GameCrudService === "undefined" ? Object : GameCrudService
    ])
], GameCrudController);

function _ts_decorate$d(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class GameCrudModule {
}
GameCrudModule = _ts_decorate$d([
    Module({
        imports: [
            TypeOrmModule.forFeature([
                CreatePlayerEntity
            ])
        ],
        controllers: [
            GameCrudController
        ],
        providers: [
            GameCrudService
        ]
    })
], GameCrudModule);

function _define_property$8(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$c(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$7(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class TodoEntity {
    constructor(){
        _define_property$8(this, "id", void 0);
        _define_property$8(this, "title", void 0);
        _define_property$8(this, "text", void 0);
        _define_property$8(this, "done", void 0);
        _define_property$8(this, "createdAt", void 0);
    }
}
_ts_decorate$c([
    PrimaryGeneratedColumn('uuid'),
    _ts_metadata$7("design:type", String)
], TodoEntity.prototype, "id", void 0);
_ts_decorate$c([
    Column(),
    _ts_metadata$7("design:type", String)
], TodoEntity.prototype, "title", void 0);
_ts_decorate$c([
    Column(),
    _ts_metadata$7("design:type", String)
], TodoEntity.prototype, "text", void 0);
_ts_decorate$c([
    Column({
        default: false
    }),
    _ts_metadata$7("design:type", Boolean)
], TodoEntity.prototype, "done", void 0);
_ts_decorate$c([
    CreateDateColumn(),
    _ts_metadata$7("design:type", typeof Date === "undefined" ? Object : Date)
], TodoEntity.prototype, "createdAt", void 0);
TodoEntity = _ts_decorate$c([
    Entity({
        name: 'todo-list'
    })
], TodoEntity);

function _define_property$7(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$b(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$6(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$2(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
class TodoListService {
    getTodoList() {
        return this.todoListRepository.find();
    }
    createTodo(todo) {
        return this.todoListRepository.save([
            todo
        ]);
    }
    updateTodo(todo) {
        return this.todoListRepository.update(todo.id, todo);
    }
    constructor(todoListRepository){
        _define_property$7(this, "todoListRepository", void 0);
        this.todoListRepository = todoListRepository;
    }
}
TodoListService = _ts_decorate$b([
    Injectable(),
    _ts_param$2(0, InjectRepository(TodoEntity)),
    _ts_metadata$6("design:type", Function),
    _ts_metadata$6("design:paramtypes", [
        typeof Repository === "undefined" ? Object : Repository
    ])
], TodoListService);

function _define_property$6(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$a(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$5(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class CreateTodoDto {
    constructor(){
        _define_property$6(this, "title", void 0);
        _define_property$6(this, "text", void 0);
    }
}
_ts_decorate$a([
    IsString(),
    _ts_metadata$5("design:type", String)
], CreateTodoDto.prototype, "title", void 0);
_ts_decorate$a([
    IsString(),
    _ts_metadata$5("design:type", String)
], CreateTodoDto.prototype, "text", void 0);

function _define_property$5(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$9(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$4(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class UpdateTodoDto {
    constructor(){
        _define_property$5(this, "id", void 0);
        _define_property$5(this, "done", void 0);
        _define_property$5(this, "createdAt", void 0);
        _define_property$5(this, "title", void 0);
        _define_property$5(this, "text", void 0);
    }
}
_ts_decorate$9([
    IsString(),
    _ts_metadata$4("design:type", String)
], UpdateTodoDto.prototype, "id", void 0);
_ts_decorate$9([
    IsBoolean(),
    _ts_metadata$4("design:type", Boolean)
], UpdateTodoDto.prototype, "done", void 0);
_ts_decorate$9([
    IsDateString(),
    _ts_metadata$4("design:type", typeof Date === "undefined" ? Object : Date)
], UpdateTodoDto.prototype, "createdAt", void 0);
_ts_decorate$9([
    IsString(),
    _ts_metadata$4("design:type", String)
], UpdateTodoDto.prototype, "title", void 0);
_ts_decorate$9([
    IsString(),
    _ts_metadata$4("design:type", String)
], UpdateTodoDto.prototype, "text", void 0);

function _define_property$4(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$8(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$3(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param$1(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
class TodoListController {
    getTodoList() {
        return this.todoListService.getTodoList();
    }
    createTodo(todo) {
        return this.todoListService.createTodo(todo);
    }
    updateTodo(todo) {
        return this.todoListService.createTodo(todo);
    }
    constructor(todoListService){
        _define_property$4(this, "todoListService", void 0);
        this.todoListService = todoListService;
    }
}
_ts_decorate$8([
    Get('/'),
    _ts_metadata$3("design:type", Function),
    _ts_metadata$3("design:paramtypes", []),
    _ts_metadata$3("design:returntype", void 0)
], TodoListController.prototype, "getTodoList", null);
_ts_decorate$8([
    Post('/create-todo'),
    _ts_param$1(0, Body()),
    _ts_metadata$3("design:type", Function),
    _ts_metadata$3("design:paramtypes", [
        typeof CreateTodoDto === "undefined" ? Object : CreateTodoDto
    ]),
    _ts_metadata$3("design:returntype", void 0)
], TodoListController.prototype, "createTodo", null);
_ts_decorate$8([
    Post('/update-todo'),
    _ts_param$1(0, Body()),
    _ts_metadata$3("design:type", Function),
    _ts_metadata$3("design:paramtypes", [
        typeof UpdateTodoDto === "undefined" ? Object : UpdateTodoDto
    ]),
    _ts_metadata$3("design:returntype", void 0)
], TodoListController.prototype, "updateTodo", null);
TodoListController = _ts_decorate$8([
    Controller('todo-list'),
    _ts_metadata$3("design:type", Function),
    _ts_metadata$3("design:paramtypes", [
        typeof TodoListService === "undefined" ? Object : TodoListService
    ])
], TodoListController);

function _ts_decorate$7(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class TodoListModule {
}
TodoListModule = _ts_decorate$7([
    Module({
        controllers: [
            TodoListController
        ],
        imports: [
            TypeOrmModule.forFeature([
                TodoEntity
            ])
        ],
        providers: [
            TodoListService
        ]
    })
], TodoListModule);

const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder().setExtras({
    isGlobal: false
}, (definition, extras)=>{
    return {
        ...definition,
        global: extras.isGlobal
    };
}).build(); // ConfigurableModuleBuilder - Фабрика, которая позволяет создавать настраиваемые модули и предоставляет способ уменьшить большинство динамических модулей.
 // Возвращает объект, состоящий из нескольких свойств, который позволяет легко создавать динамические настраиваемые модули. См. Интерфейс «ConfigurableModuleHost» для получения более подробной информации.
 // ConfigurableModuleClass
 // Класс, который представляет план/прототип для настраиваемого модуля. Этот класс предоставляет статические методы для построения динамических модулей. Их имена можно контролировать с помощью аргумента типа «MethodKey».
 // Ваш класс модуля должен наследовать от этого класса, чтобы сделать статические методы доступными.
 // MODULE_OPTIONS_TOKEN
 // Токен для поставщика модулей. Можно использовать для введения «объекта опций» поставщикам, зарегистрированным в хост-модуле.

function _define_property$3(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
class ZooModuleOptions {
    constructor(){
        _define_property$3(this, "animals", void 0);
    }
}

function _define_property$2(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$6(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$2(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
class ZooService {
    getAnimals() {
        return this.options.animals;
    }
    constructor(options){
        _define_property$2(this, "options", void 0);
        this.options = options;
    }
}
ZooService = _ts_decorate$6([
    Injectable(),
    _ts_param(0, Inject(MODULE_OPTIONS_TOKEN)),
    _ts_metadata$2("design:type", Function),
    _ts_metadata$2("design:paramtypes", [
        typeof ZooModuleOptions === "undefined" ? Object : ZooModuleOptions
    ])
], ZooService);

function _define_property$1(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$5(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata$1(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class DynamicController {
    getDynamic() {
        return this.zooService.getAnimals();
    }
    constructor(zooService){
        _define_property$1(this, "zooService", void 0);
        this.zooService = zooService;
    }
}
_ts_decorate$5([
    Get('/'),
    _ts_metadata$1("design:type", Function),
    _ts_metadata$1("design:paramtypes", []),
    _ts_metadata$1("design:returntype", void 0)
], DynamicController.prototype, "getDynamic", null);
DynamicController = _ts_decorate$5([
    Controller('dynamic'),
    _ts_metadata$1("design:type", Function),
    _ts_metadata$1("design:paramtypes", [
        typeof ZooService === "undefined" ? Object : ZooService
    ])
], DynamicController);

function _ts_decorate$4(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class DynamicService {
}
DynamicService = _ts_decorate$4([
    Injectable()
], DynamicService);

function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate$3(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
class ZooController {
    getAnimals() {
        return this.zooService.getAnimals();
    }
    constructor(zooService){
        _define_property(this, "zooService", void 0);
        this.zooService = zooService;
    }
}
_ts_decorate$3([
    Get('/'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], ZooController.prototype, "getAnimals", null);
ZooController = _ts_decorate$3([
    Controller('zoo'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof ZooService === "undefined" ? Object : ZooService
    ])
], ZooController);

function _ts_decorate$2(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class ZooModule extends ConfigurableModuleClass {
}
ZooModule = _ts_decorate$2([
    Module({
        controllers: [
            ZooController
        ],
        providers: [
            ZooService
        ],
        exports: [
            ZooService
        ]
    })
], ZooModule);

function _ts_decorate$1(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class DynamicModule {
}
DynamicModule = _ts_decorate$1([
    Module({
        imports: [
            ZooModule.register({
                animals: [
                    'animal1',
                    'animal2'
                ],
                isGlobal: false
            })
        ],
        // imports: [ZooModule.registerAsync({ useClass: Person,  })],
        controllers: [
            DynamicController
        ],
        providers: [
            DynamicService
        ]
    })
], DynamicModule);

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class AppModule {
}
AppModule = _ts_decorate([
    Module({
        imports: [
            GlobalModule,
            CatsModule,
            ServeStaticModule.forRoot({
                rootPath: path$1.join(serverRoot, 'static'),
                serveRoot: '/static',
                serveStaticOptions: {
                    fallthrough: true,
                    setHeaders (res, pathLine, stats) {
                        const type = (()=>{
                            const t = res.req.query['type'];
                            if (t === 'attachment') return 'attachment';
                            if (t === 'inline') return 'inline';
                            return null;
                        })();
                        if (!type) return;
                        res.set('Content-Disposition', `${type}; filename=${path$1.basename(pathLine)}`);
                    }
                }
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
                autoLoadEntities: true
            }),
            AuthModule,
            UsersModule,
            SettingsModule,
            EditorModule,
            ProfileModule,
            MediaViewerModule,
            GameCrudModule,
            TodoListModule,
            DynamicModule
        ],
        controllers: [
            AppController
        ],
        providers: [
            AppService
        ]
    })
], AppModule);

// if (true) {
//   async function bootstrap() {
//     const app = await NestFactory.create(AppModule);
//     const apiConfigService = app.get(ApiConfigService);
//     const port = apiConfigService.port || 3001;
//     app.enableCors({ credentials: true, origin: 'http://localhost:5173' });
//     app.useGlobalPipes(
//       new ValidationPipe({
//         whitelist: true,
//         forbidNonWhitelisted: true,
//       }),
//     );
//     await app.listen(port, () => console.log('Server started:', port));
//   }
//   bootstrap();
// }
const viteNodeApp = NestFactory.create(AppModule);
viteNodeApp.then((app)=>{
    app.enableCors({
        credentials: true,
        origin: 'http://localhost:5173'
    });
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
    }));
    const port = 3001;
    app.listen(port, ()=>console.log('Server started:', port));
}); // viteNodeApp.then(x => x.listen(3001, () => console.log('Server started:', port || 3001)))

export { viteNodeApp };
