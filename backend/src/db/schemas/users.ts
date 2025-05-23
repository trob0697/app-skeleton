import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export type Type = typeof Table.$inferSelect;
export type CreateValues = Omit<Type, "created" | "updated">;
export type UpdateValues = Partial<Omit<Type, "id" | "created" | "updated">>;

export const Table = pgTable("Users", {
  id: text("id").primaryKey(),
  created: timestamp("created").notNull().defaultNow(),
  updated: timestamp("updated")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  email: text("email").unique().notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  imageUrl: text("image_url").notNull(),
  subscriptionEnd: timestamp("subscription_end").notNull(),
});
