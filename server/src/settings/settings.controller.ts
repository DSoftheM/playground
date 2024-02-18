import { BadRequestException, Controller, Get } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { ReqUser } from './decorators/req-user.decorator';
import { SetPublic } from 'src/global/set-public';
import { CommonUser } from 'src/users/types/common-user';

@Controller('settings')
export class SettingsController {
  constructor(private usersService: UsersService) {}

  @Get('/profile')
  async getProfile(@ReqUser() commonUser: CommonUser) {
    const user = await this.usersService.getUserByLogin(commonUser.login);
    if (!user) throw new BadRequestException();
    const { password, ...restUser } = user;
    return restUser;
  }
}
