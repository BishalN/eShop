import { Field, ObjectType, Int } from 'type-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Product } from './Product';

@ObjectType()
@Entity()
export class Review {
  @Field(() => Int!)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @ManyToOne(() => User, (user) => user.reviews)
  reviewer: User;

  @Field()
  @ManyToOne(() => Product, (product) => product.reviews)
  productId: number;

  @Field()
  @Column()
  rating!: number;

  @Field()
  @Column()
  comment!: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
