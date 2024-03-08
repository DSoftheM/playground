import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'editorContext' })
export class EditorContextEntity {
  @PrimaryColumn()
  name: string;

  @Column()
  value: string;
}
