import { BadRequestException, Controller, Get } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ReqUser } from './decorators/req-user.decorator';
import { UserDTO } from 'src/users/user.dto';
import { PATH } from 'src/global/constants';

@Controller('settings')
export class SettingsController {
  constructor(private usersService: UsersService) {}

  @Get('/profile')
  async getProfile(@ReqUser() commonUser: UserDTO): Promise<UserDTO> {
    const user = await this.usersService.getUserByLogin(commonUser.login);
    if (!user) throw new BadRequestException();
    return {
      id: user.id,
      login: user.login,
      url: PATH.static.image(user.id),
    };
  }
}
