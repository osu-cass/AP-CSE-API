import { VerifyFunction } from 'passport-local';

export const authorize: VerifyFunction = (username, passwd, done) => {
  if (username === 'Thomas' && passwd === 'Noelcke') {
    const user = {
      name: 'Thomas Noelcke'
    };

    done(undefined, user);

    return;
  }

  done(undefined, false);

  return;
};
