import { Entity, ManyToOne } from '@mikro-orm/core';
import { User } from './User.entity.js';
import { Role } from './Role.entity.js';

@Entity({ tableName: 'user_role' })
export class UserRole {
  @ManyToOne(() => User, { primary: true, mapToPk: true })
  user!: number;

  @ManyToOne(() => Role, { primary: true, mapToPk: true })
  role!: number;
}

