import { Symbol } from "@shared/types/token";
import { TransactionType } from "@shared/types/transaction";

export const transactions = [
  // ADA
  { symbol: Symbol.ADA,  quantity: 4.20433753,      price: 0.29436832, fee: 0.01237624, total: 1.25000002, purchasedAt: new Date("2026-08-07T01:04:00+10:00") },
  { symbol: Symbol.ADA,  quantity: 4.61166123,      price: 0.26836832, fee: 0.01237624, total: 1.25000002, purchasedAt: new Date("2026-08-14T00:31:00+10:00") },
  // DOGE
  { symbol: Symbol.DOGE, quantity: 15.65758735,     price: 0.15808614, fee: 0.02475248, total: 2.50000000, purchasedAt: new Date("2026-05-07T22:46:00+10:00") },
  { symbol: Symbol.DOGE, quantity: 15.14279657,     price: 0.16346040, fee: 0.02475248, total: 2.50000000, purchasedAt: new Date("2026-05-15T00:01:00+10:00") },
  { symbol: Symbol.DOGE, quantity: 16.44250057,     price: 0.15053960, fee: 0.02475248, total: 2.50000000, purchasedAt: new Date("2026-05-22T00:31:00+10:00") },
  { symbol: Symbol.DOGE, quantity: 17.21940971,     price: 0.14374752, fee: 0.02475248, total: 2.50000000, purchasedAt: new Date("2026-05-31T20:55:00+10:00") },
  { symbol: Symbol.DOGE, quantity: 18.28086724,     price: 0.13540099, fee: 0.02475248, total: 2.50000000, purchasedAt: new Date("2026-06-04T00:10:00+10:00") },
  { symbol: Symbol.DOGE, quantity: 20.30588789,     price: 0.12189802, fee: 0.02475248, total: 2.50000000, purchasedAt: new Date("2026-06-10T21:28:00+10:00") },
  { symbol: Symbol.DOGE, quantity: 20.11230712,     price: 0.12307129, fee: 0.02475248, total: 2.50000000, purchasedAt: new Date("2026-06-19T00:49:00+10:00") },
  { symbol: Symbol.DOGE, quantity: 21.06682396,     price: 0.11749505, fee: 0.02475248, total: 2.50000000, purchasedAt: new Date("2026-06-24T22:49:00+10:00") },
  { symbol: Symbol.DOGE, quantity: 23.37431630,     price: 0.10589604, fee: 0.02475248, total: 2.50000000, purchasedAt: new Date("2026-07-01T22:12:00+10:00") },
  { symbol: Symbol.DOGE, quantity: 22.52901737,     price: 0.10986931, fee: 0.02475248, total: 2.50000000, purchasedAt: new Date("2026-07-11T15:12:00+10:00") },
  { symbol: Symbol.DOGE, quantity: 23.02895199,     price: 0.10748416, fee: 0.02475248, total: 2.50000000, purchasedAt: new Date("2026-07-16T21:06:00+10:00") },
  { symbol: Symbol.DOGE, quantity: 23.63306360,     price: 0.10473663, fee: 0.02475248, total: 2.50000000, purchasedAt: new Date("2026-07-23T23:22:00+10:00") },
  { symbol: Symbol.DOGE, quantity: 24.02898857,     price: 0.10301089, fee: 0.02475248, total: 2.50000000, purchasedAt: new Date("2026-07-30T21:05:00+10:00") },
  { symbol: Symbol.DOGE, quantity: 24.54638284,     price: 0.10083960, fee: 0.02475248, total: 2.50000000, purchasedAt: new Date("2026-08-07T00:54:00+10:00") },
  // PEPE
  { symbol: Symbol.PEPE, quantity: 456204.37956204, price: 0.00000543, fee: 0.02475248, total: 2.50194226, purchasedAt: new Date("2026-04-16T21:36:00+10:00") },
  { symbol: Symbol.PEPE, quantity: 453720.50816696, price: 0.00000546, fee: 0.02475248, total: 2.50206645, purchasedAt: new Date("2026-04-23T22:11:00+10:00") },
  { symbol: Symbol.PEPE, quantity: 440917.10758377, price: 0.00000561, fee: 0.02475248, total: 2.49829745, purchasedAt: new Date("2026-04-30T22:41:00+10:00") },
  { symbol: Symbol.PEPE, quantity: 408496.73202614, price: 0.00000606, fee: 0.02475248, total: 2.50024268, purchasedAt: new Date("2026-05-07T22:46:00+10:00") },
  { symbol: Symbol.PEPE, quantity: 428082.19178082, price: 0.00000578, fee: 0.02475248, total: 2.49906755, purchasedAt: new Date("2026-05-15T00:01:00+10:00") },
  { symbol: Symbol.PEPE, quantity: 457038.39122486, price: 0.00000542, fee: 0.02475248, total: 2.50190056, purchasedAt: new Date("2026-05-22T00:30:00+10:00") },
  { symbol: Symbol.PEPE, quantity: 505050.50505050, price: 0.00000490, fee: 0.02475248, total: 2.49949995, purchasedAt: new Date("2026-05-31T20:55:00+10:00") },
  { symbol: Symbol.PEPE, quantity: 534188.03418803, price: 0.00000463, fee: 0.02475248, total: 2.49804308, purchasedAt: new Date("2026-06-04T00:09:00+10:00") },
  { symbol: Symbol.PEPE, quantity: 620347.39454093, price: 0.00000399, fee: 0.02475248, total: 2.49993858, purchasedAt: new Date("2026-06-10T21:28:00+10:00") },
  { symbol: Symbol.PEPE, quantity: 581395.34883720, price: 0.00000426, fee: 0.02475248, total: 2.50149667, purchasedAt: new Date("2026-06-19T00:49:00+10:00") },
  { symbol: Symbol.PEPE, quantity: 623441.39650872, price: 0.00000397, fee: 0.02475248, total: 2.49981482, purchasedAt: new Date("2026-06-24T22:49:00+10:00") },
  { symbol: Symbol.PEPE, quantity: 733137.82991202, price: 0.00000338, fee: 0.02475248, total: 2.50275835, purchasedAt: new Date("2026-07-01T22:11:00+10:00") },
  { symbol: Symbol.PEPE, quantity: 605326.87651331, price: 0.00000409, fee: 0.02475248, total: 2.50053940, purchasedAt: new Date("2026-07-11T15:11:00+10:00") },
  { symbol: Symbol.PEPE, quantity: 615763.54679802, price: 0.00000402, fee: 0.02475248, total: 2.50012194, purchasedAt: new Date("2026-07-16T21:03:00+10:00") },
  { symbol: Symbol.PEPE, quantity: 595238.09523809, price: 0.00000416, fee: 0.02475248, total: 2.50094296, purchasedAt: new Date("2026-07-23T23:22:00+10:00") },
  { symbol: Symbol.PEPE, quantity: 606796.11650485, price: 0.00000408, fee: 0.02475248, total: 2.50048064, purchasedAt: new Date("2026-07-30T21:05:00+10:00") },
  { symbol: Symbol.PEPE, quantity: 599520.38369304, price: 0.00000413, fee: 0.02475248, total: 2.50077166, purchasedAt: new Date("2026-08-07T00:54:00+10:00") },
].map((t) => ({
  ...t, transactionType: TransactionType.Buy, /* default */
}));
