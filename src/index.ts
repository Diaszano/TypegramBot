import 'dotenv/config';
import logger from './app/libs/Logger';
import cache from './app/libs/Cache';

logger.warn('oi');
cache.has('ping');
