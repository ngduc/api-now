const faker = require('faker');

module.exports = () => {
  const users = [];
  for (let i = 0; i < 100; i++) {
    users.push({
      id: i,
      firstName: faker.name.findName(),
      lastName: faker.name.lastName(),
      avatar: faker.image.avatar()
    });
  }

  const posts = [];
  for (let i = 0; i < 200; i++) {
    posts.push({
      uuid: faker.random.uuid(),
      userId: faker.random.number({ min: 0, max: 10 }),
      title: faker.lorem.sentence(),
      createdAt: faker.date.between('2018-01-01', '2019-12-31').toISOString()
    });
  }

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

  return {
    users,
    posts,
    todos
  };
};
