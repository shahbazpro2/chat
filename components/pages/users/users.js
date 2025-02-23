import { faker } from "@faker-js/faker";
const ids = [3, 5, 6, 7];
export const users = Array.from({ length: 4 }, (_, index) => ({
  id: ids[index],
  name: faker.person.fullName(),
  email: faker.internet.email(),
  jobType: faker.name.jobType(),
  jobTitle: faker.name.jobTitle(),
  age: faker.number.int(100),
  gender: faker.person.sexType(),
  moneyRange: "1000-2000 USD",
  avatar: faker.image.avatar(),
  username: faker.internet.userName(),
  location: faker.address.city(),
}));
