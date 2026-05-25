import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { roleEnum } from "./enums";
/* ======================================================
   USERS
====================================================== */

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  phoneNumber: text('phone_number').notNull(),
  role: roleEnum('role').default('CUSTOMER').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});