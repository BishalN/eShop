import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { User } from './User';
import { Review } from './Review';

@Entity()
@ObjectType()
export class Product {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @ManyToOne(() => User, (user) => user.products)
  creator: User;

  @Field()
  @OneToMany(() => Review, (review) => review.productId)
  reviews: Review;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  brand!: string;

  @Field()
  @Column()
  image!: string;

  @Field()
  @Column()
  category!: string;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column()
  rating!: number;

  @Field()
  @Column()
  numReviews!: number;

  @Field()
  @Column()
  price!: number;

  @Field()
  @Column()
  countInStock!: number;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
