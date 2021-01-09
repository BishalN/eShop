import { User } from '../entity/User';
import {
  Resolver,
  Query,
  Mutation,
  InputType,
  Field,
  Arg,
  ObjectType,
} from 'type-graphql';
import argon2 from 'argon2';
import { getConnection } from 'typeorm';
import validator from 'validator';

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
  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: NameEmailPasswordInuput
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

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string
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

    return { user };
  }
}
