import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'articles' })
export class ArticleEntity extends AbstractEntity {
  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({ default: null, nullable: true })
  body: string | null;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.articles, { eager: true })
  @JoinColumn({ name: 'user_id' })
  author: UserEntity;
}
