import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'editorContext' })
export class EditorContextEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  userId: number;

  @Column()
  name: string;

  @Column()
  value: string;
}
