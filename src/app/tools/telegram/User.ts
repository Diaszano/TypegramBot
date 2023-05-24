import { Context } from 'telegraf';

/**
 * Aqui nós buscamos o nome do usuário caso exista, se não existir nós retornamos "Usuário"
 * @param {Context} ctx
 * @return {string}
 */
export const getName = (ctx: Context): string => {
  const name: string | undefined = ctx.from?.first_name;

  if (name) {
    return name;
  }

  const username: string | undefined = ctx.from?.username;

  if (username) {
    return username;
  }

  return 'Usuário';
};

/**
 * Aqui nós pegamos o Id do usuário no Telegram
 * @param {Context} ctx
 * @return {number | undefined}
 */
export const getId = (ctx: Context): number | undefined => {
  return ctx.from?.id;
};
