import { Entity, EntitySchema } from 'typeorm';
import { IUser } from '@shared/types/auth/user.interface';

@Entity({ name: 'users' })
export class User implements IUser {
  id: number;
  login: string;
  password: string;
}

export const UserSchema = new EntitySchema<User>({
  name: 'users',
  columns: {
    id: {
      type: Number,
      generated: true,
      primary: true,
    },
    login: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
});
