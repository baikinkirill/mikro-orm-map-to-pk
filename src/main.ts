import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import config from './mikro-orm.config.js';
import { User } from './entities/User.entity.js';
import { Role } from './entities/Role.entity.js';

async function main() {
  const orm = await MikroORM.init(config);

  await orm.schema.clearDatabase();
  await orm.schema.updateSchema();

  const em = orm.em.fork();

  const userRepository = em.getRepository(User);
  const roleRepository = em.getRepository(Role);

  const user = await userRepository.upsert({ name: 'test user', email: 'test@example.com' });
  const firstRole = await roleRepository.upsert({ name: 'maintainer', description: 'maintainer role' });
  const secondRole = await roleRepository.upsert({ name: 'viewer', description: 'viewer role' });

  await userRepository.populate(user, ['roles']);

  user.roles.add(firstRole);
  user.roles.add(secondRole);
  await em.persist(user).flush();

  const roles = await em.findAll(Role);

  await em.populate(roles, ['users']);

  console.log(roles[0].users.getIdentifiers()); // <-- [ undefined ]
  console.log(roles[0].users); // <-- initialized: true
  console.log(roles[0].users.getItems()[0].name); // <-- undefined

  await orm.close();
}

main().catch(console.error);

