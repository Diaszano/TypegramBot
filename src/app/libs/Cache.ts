import Cache, { RedisOptions } from 'dzn-cache';

const options: RedisOptions = {
  db: parseInt(process.env.CACHE_DB || '0'),
  port: parseInt(process.env.CACHE_PORT || '6379'),
  host: process.env.CACHE_HOST || '127.0.0.1',
  password: process.env.CACHE_PASS,
  retryStrategy: (times: number) => Math.min(times * 50, 2000),
  maxRetriesPerRequest: 3,
};

const cache: Cache = new Cache(options);

export default cache;
