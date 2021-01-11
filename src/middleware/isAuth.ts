import { User } from '../entity/User';
import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error('not authenticated');
  }

  return next();
};

export const isAuthAsAdmin: MiddlewareFn<MyContext> = async (
  { context },
  next
) => {
  const user = await User.findOne(context.req.session.userId);

  if (!user || !user.isAdmin) {
    throw new Error('not authenticated as an admin');
  }

  return next();
};
