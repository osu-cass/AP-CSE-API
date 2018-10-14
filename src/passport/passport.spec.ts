import { name } from 'faker';
import { authorize } from './';

describe('Authorization verification function', () => {
  it('returns a user with correct credentials', () => {
    const username = 'Thomas';
    const password = 'Noelcke';
    const done = jest.fn();
    // const spy = jest.spyOn(done);

    authorize(username, password, done);

    expect(done).toBeCalledWith(undefined, { name: 'Thomas Noelcke' });
  });

  it('does not return a user with incorrect credentials', () => {
    const username = name.firstName();
    const password = name.lastName();
    const done = jest.fn();

    authorize(username, password, done);

    expect(done).toBeCalledWith(undefined, false);
  });
});
