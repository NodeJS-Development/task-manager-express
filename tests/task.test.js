const request = require('supertest');
const app = require('../src/app');

const Task = require('../src/models/task');
const { userOne, setupDatabase, userTwo, taskOne } = require('./fixtures/db');

beforeEach(setupDatabase);

test('should create task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      'description': 'From my test'
    })
    .expect(201);

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
});

test('should fetch user tasks', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  
  expect(response.body.length).toEqual(2);
});

test('should not delete other users tasks', async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set(`Authorization`, `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

    const task = await Task.findById(taskOne._id);

    expect(task).not.toBeNull();

  })

test('should not create task with invalid description/completed', async () => {
  await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      'description': false,
      'completed': 'asdasdsa',
    })
    .expect(400);
});

test('should not update task with invalid description/completed', async () => {
  await request(app)
    .patch(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      'description': false,
      'completed': 'asdasdsa',
    })
    .expect(500);
});

test('should delete user task', async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('should not delete task if unauthenticated', async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .send()
    .expect(401);
});

test('should not update other users task', async () => {
  await request(app)
    .patch(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send({
      'description': 'This is a new description',
      'completed': true,
    })
    .expect(404);
});

test('Should fetch user task by id', async () => {
  await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not fetch user task by id if unauthenticated', async () => {
  await request(app)
    .get(`/tasks/${userOne._id}`)
    .send()
    .expect(401);
});

test('Should not fetch other users task by id', async () => {
  await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
});

test('Should fetch only completed tasks', async () => {
  await request(app)
    .get(`/tasks?completed=true`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

// Task Test Ideas
//
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks
test('Should fetch only incompleted tasks', async () => {
  await request(app)
    .get(`/tasks?completed=false`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should sort tasks by description/completed/createdAt/updatedAt', async () => {
  await request(app)
    .get('/tasks?sortBy=description_asc')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  await request(app)
    .get('/tasks?sortBy=completed_desc')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  await request(app)
    .get('/tasks?sortBy=createdAt_asc')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  await request(app)
    .get('/tasks?sortBy=updatedAt_desc')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should fetch page of tasks', async () => {
  await request(app)
    .get('/tasks?limit=1&skip=2')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

