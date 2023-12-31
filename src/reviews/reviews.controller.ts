import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewDto } from './dto/review.dto';
import { CurrentUser } from '../auth/guards/user.decorator';
import { Auth } from '../auth/guards/auth.decorator';

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Auth()
  @Post('/reviews')
  createReview(@CurrentUser('id') userId: string, @Body() reviewDto: ReviewDto){
    return this.reviewsService.create(+userId, reviewDto)
  }

  @Get('/reviews/:productId')
  getReview(@Param('productId') productId: string){
    return this.reviewsService.getAll(+productId)
  }

  @Get('/reviews/average/:productId')
  getAverage(@Param('productId') productId: string){
    return this.reviewsService.getAverageValue(+productId)
  }
}
