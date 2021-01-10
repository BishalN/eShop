import { InputType, Field } from 'type-graphql';

@InputType()
export class ProductInput {
  @Field()
  name!: string;

  @Field()
  brand!: string;

  @Field()
  category!: string;

  @Field()
  description!: string;

  @Field()
  price!: number;

  @Field()
  countInStock!: number;

  @Field()
  image!: string;
}
