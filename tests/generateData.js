const faker = require('faker');

module.exports = () => {
  // for /todos
  const todos = [];
  for (let i = 0; i < 200; i++) {
    todos.push({
      id: i,
      title: faker.lorem.sentence(),
      order: i,
      completed: Math.random() > 0.5 ? true : false,
      createdAt: faker.date.between('2018-01-01', '2019-12-31').toISOString()
    });
  }

  // generate related data for /users /posts /comments
  const users = [];
  for (let i = 0; i < 100; i++) {
    users.push({
      id: i,
      firstName: faker.name.findName(),
      lastName: faker.name.lastName(),
      avatar: faker.image.avatar()
    });
  }

  // a post belong to a userId
  const posts = [];
  for (let i = 0; i < 300; i++) {
    posts.push({
      uuid: faker.random.uuid(),
      userId: faker.random.number({ min: 0, max: 20 }),
      title: faker.lorem.sentence(),
      createdAt: faker.date.between('2018-01-01', '2019-12-31').toISOString()
    });
  }

  // a comment has author (userId) and postId
  const comments = [];
  for (let i = 0; i < 300; i++) {
    comments.push({
      uuid: faker.random.uuid(),
      postId: faker.random.number({ min: 0, max: 20 }),
      userId: faker.random.number({ min: 0, max: 20 }),
      title: faker.lorem.sentence(),
      createdAt: faker.date.between('2018-01-01', '2019-12-31').toISOString()
    });
  }

  return {
    todos,
    users,
    posts,
    comments
  };
};
