#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/9f0b3248a24174bd2feff907864423c3a98fcd2958472205f0322cc276713e83/contract';
import endContract from '../../snapshots/9f0b3248a24174bd2feff907864423c3a98fcd2958472205f0322cc276713e83/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'enquiries',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('listingId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('message', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('phone', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'listing_images',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('listingId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('url', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'listings',
        columns: [
          col('brand', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('condition', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('featured', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('fuelType', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('location', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('mileage', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('model', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('price', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('propertySize', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('quantity', 'int4', {
            notNull: true,
            default: lit(1),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('status', 'text', {
            notNull: true,
            default: lit('AVAILABLE'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('storage', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('titleDocument', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('transmission', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('year', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'enquiries',
        index: 'enquiries_listingId_idx_953decda',
        columns: ['listingId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'listing_images',
        index: 'listing_images_listingId_idx_953decda',
        columns: ['listingId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'enquiries',
        foreignKey: {
          name: 'enquiries_listingId_fkey',
          columns: ['listingId'],
          references: { schema: 'public', table: 'listings', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'listing_images',
        foreignKey: {
          name: 'listing_images_listingId_fkey',
          columns: ['listingId'],
          references: { schema: 'public', table: 'listings', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
