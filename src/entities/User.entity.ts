import { Entity, PrimaryKey, Property, ManyToMany, Collection } from '@mikro-orm/core';
import { Role } from './Role.entity.js';
import { UserRole } from './UserRole.entity.js';

@Entity()
export class User {
  @PrimaryKey({ type: 'number' })
  id!: number;

  @Property({ type: 'string' })
  name!: string;

  @Property({ type: 'string' })
  email!: string;

  @ManyToMany(() => Role, (role) => role.users, {
    pivotTable: 'user_role',
    pivotEntity: () => UserRole,
    owner: true,
  })
  roles = new Collection<Role>(this);
}

