import { faker } from "@faker-js/faker";

export default function newUser() {
  const newPassword = faker.internet.password();
  return {
    name: faker.lorem.words(2),
    email: faker.internet.email(),
    password: newPassword,
    confirmPassword: newPassword,
  };
}
