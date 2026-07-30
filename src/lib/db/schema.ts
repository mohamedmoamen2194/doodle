import { sql } from 'drizzle-orm';
import { pgTable, uuid, text, timestamp, numeric, jsonb, boolean, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').default('customer').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').default(sql`now()`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`now()`).notNull(),
});

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description'),
  image: text('image'),
  createdAt: timestamp('created_at').default(sql`now()`).notNull(),
});

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description'),
  price: numeric('price').notNull(),
  comparePrice: numeric('compare_price'),
  images: jsonb('images').default(sql`'[]'::jsonb`).notNull(),
  categoryId: uuid('category_id').references(() => categories.id),
  stock: integer('stock').default(0).notNull(),
  artist: text('artist'),
  medium: text('medium'),
  badges: jsonb('badges').default(sql`'[]'::jsonb`).notNull(),
  specs: jsonb('specs').default(sql`'[]'::jsonb`).notNull(),
  isFeatured: boolean('is_featured').default(false).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').default(sql`now()`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`now()`).notNull(),
});

export const productVariants = pgTable('product_variants', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  name: text('name').notNull(),
  sku: text('sku').unique().notNull(),
  price: numeric('price'),
  stock: integer('stock').default(0).notNull(),
});

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  status: text('status').default('pending').notNull(),
  total: numeric('total').notNull(),
  shippingAddress: jsonb('shipping_address').notNull(),
  paymentIntent: text('payment_intent'),
  createdAt: timestamp('created_at').default(sql`now()`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`now()`).notNull(),
});

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  variantId: uuid('variant_id').references(() => productVariants.id),
  quantity: integer('quantity').notNull(),
  price: numeric('price').notNull(),
});

export const offers = pgTable('offers', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  code: text('code').unique().notNull(),
  description: text('description'),
  discountType: text('discount_type').notNull(),
  discountValue: numeric('discount_value').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  maxUses: integer('max_uses'),
  usedCount: integer('used_count').default(0).notNull(),
  startsAt: timestamp('starts_at').notNull(),
  endsAt: timestamp('ends_at').notNull(),
  createdAt: timestamp('created_at').default(sql`now()`).notNull(),
});

export const reviews = pgTable('reviews', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').default(sql`now()`).notNull(),
});

export const newsletters = pgTable('newsletters', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').unique().notNull(),
  createdAt: timestamp('created_at').default(sql`now()`).notNull(),
});

export const analyticsEvents = pgTable('analytics_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id'),
  sessionId: text('session_id'),
  eventType: text('event_type').notNull(),
  page: text('page'),
  metadata: jsonb('metadata').default(sql`'{}'::jsonb`).notNull(),
  createdAt: timestamp('created_at').default(sql`now()`).notNull(),
});

export const contacts = pgTable('contacts', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').default(sql`now()`).notNull(),
});

export const schema = {
  users,
  categories,
  products,
  productVariants,
  orders,
  orderItems,
  offers,
  reviews,
  newsletters,
  analyticsEvents,
  contacts,
};
