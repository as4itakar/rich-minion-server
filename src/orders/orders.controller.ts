import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CurrentUser } from 'src/auth/guards/user.decorator';
import { OrderDto } from './dto/order.dto';
import { Auth } from 'src/auth/guards/auth.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Auth()
  @UsePipes(new ValidationPipe())
  @Post()
  create(@CurrentUser('id') id: string, @Body() orderDto: OrderDto){
    return this.ordersService.createOrder(orderDto, +id)
  }

  @Auth()
  @Get()
  get(@CurrentUser('id') id: string){
    console.log(id)
    return this.ordersService.getByUserId(+id)
  }
}
