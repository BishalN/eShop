import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { User } from './User';
import { Review } from './Review';

@Entity()
@ObjectType()
export class Product extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.products)
  creator!: User;

  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.productId, { nullable: true })
  reviews: Review[];

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
  @Column({ default: 0 })
  rating: number;

  @Field()
  @Column({ default: 0 })
  numReviews: number;

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
