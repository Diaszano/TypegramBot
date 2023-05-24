import 'dotenv/config';
import telegram_token from './app/config/Telegram';
import { Context, Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import logger from './app/libs/Logger';
import { getId, getName } from './app/tools/telegram/User';
import User from './app/repository/User';

async function run(): Promise<void> {
  const telegram = new Telegraf(telegram_token);

  telegram.use(async (ctx: Context, next): Promise<void> => {
    const name: string = getName(ctx);
    const telegram_id: number | undefined = getId(ctx);

    if (telegram_id) {
      await User.findOrCreate({ name, telegram_id });
    }

    const startTime: number = Date.now();
    await next();
    const endTime: number = Date.now();

    const elapsedTime: number = (endTime - startTime) / 1000;

    logger.info(
      `O tempo total para responder o usuário ${name} foi de ${elapsedTime} segundos.`,
    );
  });
  telegram.on(message('text'), async (ctx): Promise<void> => {
    await ctx.reply(`Oii ${ctx.from?.username}`);
  });

  await telegram.launch();
  process.once('SIGINT', (): void => telegram.stop('SIGINT'));
  process.once('SIGTERM', (): void => telegram.stop('SIGTERM'));
}

run().then();
