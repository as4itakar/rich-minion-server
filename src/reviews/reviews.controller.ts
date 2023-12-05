import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewDto } from './dto/review.dto';
import { CurrentUser } from 'src/auth/guards/user.decorator';
import { Auth } from 'src/auth/guards/auth.decorator';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Auth()
  @Post()
  createReview(@CurrentUser('id') userId: string, @Body() reviewDto: ReviewDto){
    return this.reviewsService.create(+userId, reviewDto)
  }

  @Get('/:productId')
  getReview(@Param('productId') productId: string){
    return this.reviewsService.getAll(+productId)
  }

  @Get('/average/:productId')
  getAverage(@Param('productId') productId: string){
    return this.reviewsService.getAverageValue(+productId)
  }
}
