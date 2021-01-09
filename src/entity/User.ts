import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  isAdmin: number;

  @Column()
  createdAt: Date;

  @Column()
  upadatedAt: Date;
}
