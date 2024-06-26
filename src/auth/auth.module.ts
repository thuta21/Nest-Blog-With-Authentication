import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../common/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './contrants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserService } from '../user/user.service';
import { LocalStrategy } from './strategy/local.strategy';
import { ArticleEntity } from '../common/entities/article.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService, LocalStrategy],
  imports: [
    TypeOrmModule.forFeature([UserEntity, ArticleEntity]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [PassportModule, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
