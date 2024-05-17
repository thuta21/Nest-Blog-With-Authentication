import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../common/entities/user.entity';
import { ArticleEntity } from '../common/entities/article.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ArticleEntity]), AuthModule],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
