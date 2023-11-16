import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CurrentUser } from 'src/auth/guards/user.decorator';
import { OrderItemDto } from './dto/order.dto';
import { Auth } from 'src/auth/guards/auth.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Auth()
  @UsePipes(new ValidationPipe())
  @Post()
  create(@CurrentUser('id') id: number, @Body() orderDto: OrderItemDto[]){
    return this.ordersService.createOrder(id, orderDto)
  }

  @Auth()
  @Get()
  get(@CurrentUser('id') id: number){
    return this.ordersService.getByUserId(id)
  }
}
