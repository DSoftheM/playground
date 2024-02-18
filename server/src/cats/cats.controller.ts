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
  create(@Body() user: CreateCatDto) {
    return this.catsService.create(user);
  }

  @Get('/delete')
  deleteUser(@Query('id', ParseIntPipe) id: number) {
    return this.catsService.delete(id);
  }
}
