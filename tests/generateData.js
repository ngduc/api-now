const faker = require('faker');

module.exports = () => {
  const posts = [];
  for (let i = 0; i < 20; i++) {
    posts.push({ id: faker.random.uuid(), title: faker.lorem.sentence() });
  }
  return {
    posts
  };
};
