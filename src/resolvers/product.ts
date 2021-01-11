import { Product } from '../entity/Product';
import { ProductInput } from '../utils/ProductInput';
import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { MyContext } from '../types';
import { User } from '../entity/User';
import { getConnection } from 'typeorm';
import { isAuthAsAdmin } from '../middleware/isAuth';

@Resolver(Product)
export class PrductResolver {
  @FieldResolver(() => User)
  async creator(@Root() product) {
    console.log(product);
    const creator = await User.findOne(product.creatorId);
    return creator;
  }

  @Query(() => [Product])
  products() {
    return Product.find({});
  }

  @Query(() => Product)
  product(@Arg('id', () => ID!) id: number) {
    return Product.findOne(id);
  }

  @UseMiddleware(isAuthAsAdmin)
  @Mutation(() => Product)
  async createProduct(
    @Arg('options') options: ProductInput,
    @Ctx() { req }: MyContext
  ): Promise<Product> {
    const user = await User.findOne(req.session.userId);
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
          description: options.description,
        })
        .returning('*')
        .execute();
      product = result.raw[0];
    } catch (error) {
      console.log(error);
    }
    return product;
  }

  @UseMiddleware(isAuthAsAdmin)
  @Mutation(() => Product)
  async updateProduct(
    @Arg('options') options: ProductInput,
    @Arg('id', () => Int!) id: number
  ): Promise<Product | null> {
    let updatedProduct;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .update(Product)
        .set({ ...options })
        .where('id =:id', {
          id,
        })
        .returning('*')
        .execute();
      updatedProduct = result.raw[0];
    } catch (error) {
      throw new Error(error.message);
    }
    return updatedProduct;
  }
}
