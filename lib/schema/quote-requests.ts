import { pgTable, text, uuid, timestamp, boolean, decimal } from "drizzle-orm/pg-core";
import { quoteStatusEnum } from "./enums";
import { users } from "./users"; 

/* ======================================================
   QUOTE REQUESTS
====================================================== */

export const quoteRequests = pgTable(
  "quote_requests",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    userId: uuid("user_id")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),

    status: quoteStatusEnum(
      "status"
    )
      .default("PENDING")
      .notNull(),

    notes: text("notes"),

    requestedInstallation: boolean(
      "requested_installation"
    )
      .default(false)
      .notNull(),

    estimatedPrice: decimal(
      "estimated_price",
      {
        precision: 10,
        scale: 2,
      }
    ),

    finalPrice: decimal(
      "final_price",
      {
        precision: 10,
        scale: 2,
      }
    ),

    createdAt: timestamp(
      "created_at"
    )
      .defaultNow()
      .notNull(),

    updatedAt: timestamp(
      "updated_at"
    )
      .defaultNow()
      .notNull(),
  }
);