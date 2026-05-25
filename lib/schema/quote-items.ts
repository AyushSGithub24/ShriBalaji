import { pgTable, text, uuid, timestamp, decimal, integer } from "drizzle-orm/pg-core";
import { quoteRequests } from "./quote-requests";
import { products ,productOptions, productSizes,productOptionValues } from "./products";
import { uploadedFiles } from "./uploaded-files";

/* ======================================================
   QUOTE ITEMS
====================================================== */

export const quoteItems = pgTable(
  "quote_items",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    quoteRequestId: uuid(
      "quote_request_id"
    )
      .references(
        () => quoteRequests.id,
        {
          onDelete: "cascade",
        }
      )
      .notNull(),

    productId: uuid("product_id")
      .references(() => products.id)
      .notNull(),

    sizeId: uuid("size_id")
      .references(
        () => productSizes.id
      ),

    quantity: integer(
      "quantity"
    )
      .default(1)
      .notNull(),

    customWidth: decimal(
      "custom_width",
      {
        precision: 10,
        scale: 2,
      }
    ),

    customHeight: decimal(
      "custom_height",
      {
        precision: 10,
        scale: 2,
      }
    ),

    customText: text(
      "custom_text"
    ),

    designNotes: text(
      "design_notes"
    ),

    quotedPrice: decimal(
      "quoted_price",
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
  }
);

/* ======================================================
   QUOTE ITEM SELECTIONS
====================================================== */

export const quoteItemSelections =
  pgTable(
    "quote_item_selections",
    {
      id: uuid("id")
        .defaultRandom()
        .primaryKey(),

      quoteItemId: uuid(
        "quote_item_id"
      )
        .references(
          () => quoteItems.id,
          {
            onDelete:
              "cascade",
          }
        )
        .notNull(),

      productOptionId: uuid(
        "product_option_id"
      )
        .references(
          () => productOptions.id
        )
        .notNull(),

      productOptionValueId:
        uuid(
          "product_option_value_id"
        ).references(
          () =>
            productOptionValues.id
        ),

      customValue: text(
        "custom_value"
      ),
    }
  );

/* ======================================================
   QUOTE ITEM FILES
====================================================== */

export const quoteItemFiles = pgTable(
  "quote_item_files",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    quoteItemId: uuid(
      "quote_item_id"
    )
      .references(() => quoteItems.id, {
        onDelete: "cascade",
      })
      .notNull(),

    uploadedFileId: uuid(
      "uploaded_file_id"
    )
      .references(
        () => uploadedFiles.id
      )
      .notNull(),
  }
);