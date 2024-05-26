import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'game-crud' })
export class CreatePlayerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
