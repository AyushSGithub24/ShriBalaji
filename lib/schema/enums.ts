import { pgEnum } from "drizzle-orm/pg-core";
export const roleEnum = pgEnum('role', ['CUSTOMER', 'ADMIN']);

export const productStatusEnum = pgEnum("product_status", [
  "ACTIVE",
  "DRAFT",
  "ARCHIVED",
]);

export const optionTypeEnum = pgEnum("option_type", [
  "SELECT",
  "RADIO",
  "CHECKBOX",
  "TEXT",
  "TEXTAREA",
]);

export const quoteStatusEnum = pgEnum("quote_status", [
  "PENDING",
  "REVIEWING",
  "QUOTED",
  "CONFIRMED",
  "ADVANCE_PAID",
  "IN_PRODUCTION",
  "READY_FOR_DELIVERY",
  "DELIVERED",
  "COMPLETED",
  "CANCELLED",
]);

export const sizeUnitEnum = pgEnum("size_unit", [
  "FT",
  "INCH",
  "CM",
  "MM"
]);