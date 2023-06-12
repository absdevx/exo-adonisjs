import Task from "App/Models/Task";
import User from "App/Models/User";
import Factory from "@ioc:Adonis/Lucid/Factory";
import Category from "App/Models/Category";

let category_counter = 1;
export const CategoryFactory = Factory.define(Category, ({ faker }) => {
  return {
    name: `Category N°${category_counter++}`,
    description: faker.lorem.paragraph(),
  };
}).build();


export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
  };
}).build();

let task_counter = 1;
export const TaskFactory = Factory.define(Task, ({ faker }) => {
  return {
    title: `Task N°${task_counter++}`,
    description: faker.lorem.paragraph(),
  };
})
  .relation("category", () => CategoryFactory)
  .relation("users", () => UserFactory)
  .build();
