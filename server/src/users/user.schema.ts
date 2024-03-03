import { Column, Entity, EntitySchema, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '@shared/types/auth/user.interface';

@Entity('users')
export class UserSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string; //  unique: true,

  @Column()
  password: string;
}
