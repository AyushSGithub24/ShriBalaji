import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum('role', ['CUSTOMER', 'ADMIN']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: roleEnum('role').default('CUSTOMER').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});