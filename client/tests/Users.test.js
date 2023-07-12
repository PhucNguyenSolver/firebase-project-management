import { UserDTO } from '../src/services/IUsers'
import Users from './__mocks__/MockUsers';
// import Users from '../src/services/Users'

test('Users class should implement CRUD operations', async () => {
  const users = new Users()

  // Test create
  const newUser = new UserDTO('1', 'Alice', 'alice@example.com')
  await users.create('1', newUser);

  // Test read
  let user = await users.read('1');
  expect(user.id).toBe(newUser.id);
  expect(user.name).toBe(newUser.name);
  expect(user.email).toBe(newUser.email);

  // Test read undefine
  let result = await users.read('non-exist')
  expect(result).toBeUndefined()
});
