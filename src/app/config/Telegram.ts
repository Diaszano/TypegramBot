import logger from '../libs/Logger';

const telegram_token: string = process.env.TELEGRAM_TOKEN || '';

if (telegram_token === '') {
  logger.error('Está faltando a variável de ambiente "TELEGRAM_TOKEN"!');
  throw new Error('Está faltando a variável de ambiente "TELEGRAM_TOKEN"!');
}

export default telegram_token;
