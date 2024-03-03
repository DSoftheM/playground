import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserSchema } from 'src/users/user.schema';

interface IUser {
  login: string;
  password: string;
  id: number;
}

@Entity('cats')
export class CatSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  isActive: boolean;

  @Column()
  lastName: string;

  @OneToOne((type) => UserSchema)
  @JoinColumn()
  master: IUser;
}
