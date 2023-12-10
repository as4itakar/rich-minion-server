import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CurrentUser } from '../auth/guards/user.decorator';
import { OrderDto } from './dto/order.dto';
import { Auth } from '../auth/guards/auth.decorator';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Auth()
  @UsePipes(new ValidationPipe())
  @Post('/orders')
  create(@CurrentUser('id') id: string, @Body() orderDto: OrderDto){
    return this.ordersService.createOrder(orderDto, +id)
  }

  @Auth()
  @Get('/orders')
  get(@CurrentUser('id') id: string){
    return this.ordersService.getByUserId(+id)
  }
}
