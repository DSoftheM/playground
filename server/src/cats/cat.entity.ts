import { CanActivate, ExecutionContext } from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'http';
import { Observable } from 'rxjs';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cats' })
export class CatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
