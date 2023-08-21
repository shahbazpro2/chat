import { faker } from "@faker-js/faker";
export const users = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  age: faker.number.int(100),
  gender: "Male",
  moneyRange: "1000-2000 USD",
  avatar: faker.image.avatar(),
}));
