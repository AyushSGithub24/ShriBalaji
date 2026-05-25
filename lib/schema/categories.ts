import { pgTable, text, uuid, timestamp, boolean } from "drizzle-orm/pg-core";

/* ======================================================
   CATEGORIES
====================================================== */

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name").notNull(),

  slug: text("slug")
    .notNull()
    .unique(),

  description: text("description"),

  image: text("image"),

  isActive: boolean("is_active")
    .default(true)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});