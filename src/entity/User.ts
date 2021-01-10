import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { Product } from './Product';
import { Review } from './Review';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => Int!)
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Product, (product) => product.creator)
  products: Product[];

  @OneToMany(() => Review, (review) => review.reviewer)
  reviews: Review[];

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field()
  @Column({ default: false })
  isAdmin!: boolean;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  upadatedAt!: Date;
}
