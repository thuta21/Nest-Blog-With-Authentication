import { createArticleDto } from './create-article.dto';
import { PartialType } from '@nestjs/mapped-types';

export class updateArticleDto extends PartialType(createArticleDto) {}
