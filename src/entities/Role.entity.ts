import { Entity, PrimaryKey, Property, ManyToMany, Collection } from '@mikro-orm/core';
import { User } from './User.entity.js';
import { UserRole } from './UserRole.entity.js';

@Entity()
export class Role {
  @PrimaryKey({ type: 'number' })
  id!: number;

  @Property({ type: 'string' })
  name!: string;

  @Property({ type: 'string', nullable: true })
  description?: string;

  @ManyToMany(() => User, (user) => user.roles, {
    pivotTable: 'user_role',
    pivotEntity: () => UserRole,
  })
  users = new Collection<User>(this);
}

