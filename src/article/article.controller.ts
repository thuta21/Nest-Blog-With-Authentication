import {
  Body,
  Controller, Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from "@nestjs/common";
import { ArticleService } from './article.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/decorator/user.decorator';
import { UserEntity } from '../common/entities/user.entity';
import { createArticleDto } from './dto/create-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getArticles() {
    try {
      const data = await this.articleService.getArticles();
      return {
        success: true,
        data,
        message: 'Articles Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Post()
  @UseGuards(AuthGuard())
  async createArticles(
    @User() user: UserEntity,
    @Body() data: createArticleDto,
  ) {
    return this.articleService.createArticles(user, data);
  }

  @Put(':id/update')
  @UseGuards(AuthGuard())
  async updateArticle(
    @User() user: UserEntity,
    @Param('id') id: string,
    @Body() data: createArticleDto,
  ) {
    return this.articleService.updateArticles(id, data);
  }

  @Delete(':id/delete')
  async remove(@Param('id') id: string) {
    try {
      await this.articleService.remove(id);
      return {
        success: true,
        message: 'Article Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
