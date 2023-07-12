import Users from '../src/services/Users'

test('Users class should implement CRUD operations', async () => {
  const users = new Users();

  // Test create
  const newUser = { id: '1', name: 'Alice', email: 'alice@example.com' };
  await users.create(newUser);

  // Test read
  let user = await users.read('1');
  expect(user.id).toBe(newUser.id);
  expect(user.name).toBe(newUser.name);
  expect(user.email).toBe(newUser.email);

  // Test update
  await users.update('1', { name: 'Bob' });
  user = await users.read('1');
  expect(user.name).toBe('Bob');

  // Test delete
  await users.delete('1');
  user = await users.read('1');
  expect(user).toBeUndefined();
});
