import logger from '../libs/Logger';

const get_user: string | undefined = process.env.USER_LINKETRACK;
const get_token: string | undefined = process.env.TOKEN_LINKETRACK;

if (get_user === undefined) {
  logger.error('Está faltando a variável de ambiente "USER_LINKETRACK"!');
  throw new Error('Está faltando a variável de ambiente "USER_LINKETRACK"!');
}

if (get_token === undefined) {
  logger.error('Está faltando a variável de ambiente "TOKEN_LINKETRACK"!');
  throw new Error('Está faltando a variável de ambiente "TOKEN_LINKETRACK"!');
}

export const user: string = get_user;
export const token: string = get_token;
