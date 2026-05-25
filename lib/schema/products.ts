import { pgTable, text, uuid, timestamp, boolean, decimal, integer } from "drizzle-orm/pg-core";
import {  optionTypeEnum, productStatusEnum,  sizeUnitEnum } from "./enums";
import { categories } from "./categories";


/* ======================================================
   PRODUCTS
====================================================== */

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),

  categoryId: uuid("category_id")
    .references(() => categories.id, {
      onDelete: "cascade",
    })
    .notNull(),

  title: text("title").notNull(),

  slug: text("slug")
    .notNull()
    .unique(),

  shortDescription: text("short_description"),

  description: text("description"),

  thumbnail: text("thumbnail"),

  basePrice: decimal("base_price", {
    precision: 10,
    scale: 2,
  }),

  requiresQuotation: boolean(
    "requires_quotation"
  )
    .default(true)
    .notNull(),

  allowCustomSize: boolean(
    "allow_custom_size"
  )
    .default(false)
    .notNull(),

  allowDesignUpload: boolean(
    "allow_design_upload"
  )
    .default(true)
    .notNull(),

  allowCustomText: boolean(
    "allow_custom_text"
  )
    .default(false)
    .notNull(),

  installationAvailable: boolean(
    "installation_available"
  )
    .default(false)
    .notNull(),

  minimumOrderQuantity: integer(
    "minimum_order_quantity"
  )
    .default(1)
    .notNull(),

  estimatedProductionDays: integer(
    "estimated_production_days"
  ),

  status: productStatusEnum("status")
    .default("ACTIVE")
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});

/* ======================================================
   PRODUCT IMAGES
====================================================== */

export const productImages = pgTable(
  "product_images",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    productId: uuid("product_id")
      .references(() => products.id, {
        onDelete: "cascade",
      })
      .notNull(),

    imageUrl: text("image_url")
      .notNull(),

    altText: text("alt_text"),

    sortOrder: integer("sort_order")
      .default(0)
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  }
);

/* ======================================================
   PRODUCT SIZES
====================================================== */

export const productSizes = pgTable(
  "product_sizes",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    productId: uuid("product_id")
      .references(() => products.id, {
        onDelete: "cascade",
      })
      .notNull(),

    label: text("label").notNull(),

    width: decimal("width", {
      precision: 10,
      scale: 2,
    }),

    height: decimal("height", {
      precision: 10,
      scale: 2,
    }),

    unit: sizeUnitEnum("unit")
      .default("FT")
      .notNull(),

    priceAdjustment: decimal(
      "price_adjustment",
      {
        precision: 10,
        scale: 2,
      }
    ).default("0"),

    isDefault: boolean("is_default")
      .default(false)
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  }
);

/* ======================================================
   PRODUCT OPTIONS
====================================================== */

export const productOptions = pgTable(
  "product_options",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    productId: uuid("product_id")
      .references(() => products.id, {
        onDelete: "cascade",
      })
      .notNull(),

    name: text("name").notNull(),

    type: optionTypeEnum("type")
      .notNull(),

    isRequired: boolean(
      "is_required"
    )
      .default(false)
      .notNull(),

    sortOrder: integer("sort_order")
      .default(0)
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  }
);

/* ======================================================
   PRODUCT OPTION VALUES
====================================================== */

export const productOptionValues =
  pgTable(
    "product_option_values",
    {
      id: uuid("id")
        .defaultRandom()
        .primaryKey(),

      optionId: uuid("option_id")
        .references(
          () => productOptions.id,
          {
            onDelete: "cascade",
          }
        )
        .notNull(),

      label: text("label")
        .notNull(),

      priceAdjustment: decimal(
        "price_adjustment",
        {
          precision: 10,
          scale: 2,
        }
      ).default("0"),

      isDefault: boolean(
        "is_default"
      )
        .default(false)
        .notNull(),

      sortOrder: integer(
        "sort_order"
      )
        .default(0)
        .notNull(),
    }
  );
