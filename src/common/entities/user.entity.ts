import { BeforeInsert, Column, Entity, Unique } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Exclude, instanceToPlain } from 'class-transformer';
import { AbstractEntity } from './abstract-entity';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'users' })
@Unique(['email'])
export class UserEntity extends AbstractEntity {
  @Column()
  @IsEmail()
  @ApiProperty({ type: 'string', description: 'Email address' })
  email: string;

  @Column()
  @ApiProperty({ type: 'string', description: 'Username' })
  username: string;

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
