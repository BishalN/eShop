import { User } from '../entity/User';
import {
  Resolver,
  Mutation,
  InputType,
  Field,
  Arg,
  ObjectType,
  Ctx,
  Query,
} from 'type-graphql';
import argon2 from 'argon2';
import { getConnection } from 'typeorm';
import validator from 'validator';
import { MyContext } from '../types';

@InputType()
class NameEmailPasswordInuput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    return User.findOne(req.session.userId);
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: NameEmailPasswordInuput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if (!validator.isEmail(options.email)) {
      return { errors: [{ field: 'email', message: 'Invalid Email' }] };
    }
    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          name: options.name,
          email: options.email,
          password: hashedPassword,
        })
        .returning('*')
        .execute();

      user = result.raw[0];
    } catch (err) {
      // duplicate email error
      if (err.code === '23505') {
        return {
          errors: [
            {
              field: 'email',
              message: 'email already in use',
            },
          ],
        };
      }
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return {
        errors: [
          { field: 'Email', message: 'User with that email does not exist' },
        ],
      };
    }

    const isCorrect = await argon2.verify(user.password, password);

    if (!isCorrect) {
      return {
        errors: [{ field: 'Password', message: 'Invalid Password' }],
      };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    req.session.userId = undefined;
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie('qid');
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
