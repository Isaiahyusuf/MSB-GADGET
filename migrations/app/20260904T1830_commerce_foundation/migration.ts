#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/808407d6edbfc96909b4ba247ea86451b1ffe3f598fb585dd12bc8d13abaf146/contract';
import endContract from '../../snapshots/808407d6edbfc96909b4ba247ea86451b1ffe3f598fb585dd12bc8d13abaf146/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/9f0b3248a24174bd2feff907864423c3a98fcd2958472205f0322cc276713e83/contract';
import startContract from '../../snapshots/9f0b3248a24174bd2feff907864423c3a98fcd2958472205f0322cc276713e83/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'order_items',
        columns: [
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('listingId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('orderId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('quantity', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('unitPrice', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'orders',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('deliveryAddress', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('fullName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('orderStatus', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('paymentAccountId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('paymentStatus', 'text', {
            notNull: true,
            default: lit('UNPAID'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('phone', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('totalAmount', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'payment_accounts',
        columns: [
          col('accountName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('accountNumber', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('active', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('bankName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('instructions', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'sessions',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('expiresAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('tokenHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'users',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('passwordHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('phone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('role', 'text', {
            notNull: true,
            default: lit('CUSTOMER'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'sessions',
        constraint: 'sessions_tokenHash_key',
        columns: ['tokenHash'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'users',
        constraint: 'users_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'order_items',
        index: 'order_items_listingId_idx_953decda',
        columns: ['listingId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'order_items',
        index: 'order_items_orderId_idx_d284871b',
        columns: ['orderId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'orders',
        index: 'orders_orderStatus_idx_a61e9db6',
        columns: ['orderStatus'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'orders',
        index: 'orders_paymentAccountId_idx_6d12e2f9',
        columns: ['paymentAccountId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'orders',
        index: 'orders_paymentStatus_idx_6874c030',
        columns: ['paymentStatus'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'orders',
        index: 'orders_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'payment_accounts',
        index: 'payment_accounts_active_idx_8af4daed',
        columns: ['active'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'sessions',
        index: 'sessions_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'users',
        index: 'users_email_idx_46df9cad',
        columns: ['email'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'order_items',
        foreignKey: {
          name: 'order_items_orderId_fkey',
          columns: ['orderId'],
          references: { schema: 'public', table: 'orders', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'order_items',
        foreignKey: {
          name: 'order_items_listingId_fkey',
          columns: ['listingId'],
          references: { schema: 'public', table: 'listings', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'orders',
        foreignKey: {
          name: 'orders_paymentAccountId_fkey',
          columns: ['paymentAccountId'],
          references: { schema: 'public', table: 'payment_accounts', columns: ['id'] },
          onDelete: 'setNull',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'orders',
        foreignKey: {
          name: 'orders_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'sessions',
        foreignKey: {
          name: 'sessions_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
