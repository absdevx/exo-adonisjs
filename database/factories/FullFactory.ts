import Task from "App/Models/Task";
import User from "App/Models/User";
import Factory from "@ioc:Adonis/Lucid/Factory";
import Category from "App/Models/Category";

export const CategoryFactory = Factory.define(Category, ({ faker }) => {
  return {
    name: `Category N°${faker.number.int({min: 1, max: 10, })}`,
    description: faker.lorem.paragraph(),
  };
}).build();

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
  };
}).build();

export const TaskFactory = Factory.define(Task, ({ faker }) => {
  return {
    title: `Task N°${faker.number.int({min: 1, max: 10, })}`,
    description: faker.lorem.paragraph(),
  };
})
  .relation("category", () => CategoryFactory)
  .relation("users", () => UserFactory)
  .build();
