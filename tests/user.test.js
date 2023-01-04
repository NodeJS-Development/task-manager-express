const request = require('supertest');

const app = require('../src/app');
const User = require('../src/models/user');
const { userOne, userOneId, setupDatabase } = require('./fixtures/db');

// This runs before each test
beforeEach(setupDatabase);


test('should signup a new user', async () => {
  const response = await request(app).post('/users').send({
    name: 'Brayan Garcia',
    email: 'brayan@example.com',
    password: 'MyPass777!',
  }).expect(201);

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: 'Brayan Garcia',
      email: 'brayan@example.com',
    },
    token: user.tokens[0].token,
  });

  expect(user.password).not.toBe('MyPass777!');

});

// Goal: Validate new token is saved
//
// 1. Fetch the user from the database
// 2. Assert that token in response matches users second token
// 3. Test your work!

test('Should login existing user', async () => {
  const response = await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password,
  }).expect(200);

  const user = await User.findById(userOneId);

  expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not login nonexisting user', async () => {
  await request(app).post('/users/login').send({
    email: `${userOne.email}!`,
    password: userOne.password
  }).expect(400);
});

test('should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('should not get profile for unauthenticated user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401);
});

// Goal: validate user is removed
// 1. Fetch user from the database
// 2. Assert null response (use assertion from signup test)

test('should delete account for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test('should not delete account for unauthenticated user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401);
});

test('should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test('should update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'Jess'
    })
    .expect(200);

  const user = await User.findById(userOneId);

  expect(user.name).toEqual('Jess');

});


test('should not update invalid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'Philadelphia'
    })
    .expect(400);

});

test('should not sign up user with invalid name/email/password', async () => {
  await request(app)
    .post('/users')
    .send({
      name: 'Brayan',
      password: '123ab'
    })
    .expect(400);
});

test('should not update user if anauthenticated', async () => {
  await request(app)
    .patch('/users/me')
    .send({
      name: 'Gabriela'
    })
    .expect(401);
});

test('should not update user with invalid name/email/password', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      email: 'myemail@'
    })
    .expect(400);
});

test('should not delete user if unauthenticated', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401);
});

