import { BeforeInsert, Column, Entity, Unique } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Exclude, instanceToPlain } from 'class-transformer';
import { AbstractEntity } from './abstract-entity';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
@Unique(['email'])
export class User extends AbstractEntity {
  @Column()
  @IsEmail()
  email: string;

  @Column()
  username: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: null, nullable: true })
  image: string | null;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toJSON(): any {
    return instanceToPlain(this, { strategy: 'excludeAll' });
  }
}
