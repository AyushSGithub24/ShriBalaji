import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

/* ======================================================
   UPLOADED FILES
====================================================== */

export const uploadedFiles = pgTable(
  "uploaded_files",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    userId: uuid("user_id")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),

    fileUrl: text("file_url")
      .notNull(),

    fileName: text("file_name")
      .notNull(),

    mimeType: text("mime_type"),

    createdAt: timestamp(
      "created_at"
    )
      .defaultNow()
      .notNull(),
  }
);