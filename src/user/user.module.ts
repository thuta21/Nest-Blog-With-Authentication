import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../common/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { ArticleEntity } from '../common/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ArticleEntity]), AuthModule],
  controllers: [UserController, ProfileController],
  providers: [UserService],
})
export class UserModule {}
