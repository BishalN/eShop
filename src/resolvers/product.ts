import { Product } from '../entity/Product';
import { ProductInput } from '../utils/ProductInput';
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { MyContext } from '../types';
import { User } from '../entity/User';
import { getConnection } from 'typeorm';

@Resolver()
export class PrductResolver {
  @Mutation(() => Product)
  async createProduct(
    @Arg('options') options: ProductInput,
    @Ctx() { req }: MyContext
  ): Promise<Product> {
    const user = await User.findOne(req.session.userId);
    if (!user || !user.isAdmin) {
      throw new Error('Not authorized as an admin');
    }

    let product;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values({
          name: options.name,
          brand: options.brand,
          category: options.category,
          image: options.image,
          countInStock: options.countInStock,
          price: options.price,
          creator: user,
        })
        .returning('*')
        .execute();
      product = result.raw[0];
    } catch (error) {
      console.log(error);
    }
    return product;
  }
}
