import { Body, Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('/')
  getAll() {
    return this.catsService.findAll();
  }

  @Post('/create')
  async create(@Body() user: CreateCatDto) {
    return await this.catsService.create(user);
  }

  @Get('/delete')
  deleteUser(@Query('id') id: string) {
    return this.catsService.delete(id);
  }
}
