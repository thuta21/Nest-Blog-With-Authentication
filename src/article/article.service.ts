import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '../common/entities/article.entity';
import { DataSource, DeleteResult, Repository } from "typeorm";
import { UserEntity } from '../common/entities/user.entity';
import { createArticleDto } from './dto/create-article.dto';
import { updateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private dataSource: DataSource,
  ) {}

  async getArticles() {
    return await this.articleRepository.find();
  }

  async createArticles(user: UserEntity, data: createArticleDto) {
    let author = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
      if (!author) {
        author = await queryRunner.manager.save(UserEntity, {
          username: user.username,
        });
      }

      const book = await queryRunner.manager.save(ArticleEntity, {
        slug: data.slug,
        title: data.title,
        body: data.body,
        author,
      });

      await queryRunner.commitTransaction();
      return book;
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
    }

    return { message: 'error' };
  }

  // async updateArticles(user: UserEntity, id, data: updateArticleDto) {
  //   return await this.articleRepository.update(
  //     {
  //       id,
  //     },
  //     data,
  //   );
  // }

  async updateArticles(id, data: updateArticleDto): Promise<UserEntity> {
    await this.articleRepository.update(id, data);
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id): Promise<DeleteResult> {
    return await this.articleRepository.delete(id);
  }
}
