import { PrismaClient } from '@prisma/client';
import logger from '../libs/Logger';
import Cache from 'dzn-cache';
import cache from '../libs/Cache';
import { User as UserSchema, UserCreate } from '../schema/User';

class User {
  constructor(
    private readonly __prisma: PrismaClient = new PrismaClient(),
    private readonly __cache: Cache = cache,
  ) {}

  public async findFirst(telegram_id: number): Promise<UserSchema | null> {
    logger.info(
      `Realizou-se uma busca pelo usuário correspondente ao telegram_id (${telegram_id}).`,
    );
    const key = `USER::TELEGRAM_ID::${telegram_id}`;

    const user_cache: string | null = await this.__cache.get(key);

    if (user_cache) {
      logger.info(
        `A busca pelo usuário correspondente ao telegram_id (${telegram_id}) retornou ` +
          'com sucesso da cache.',
      );
      return JSON.parse(user_cache);
    }

    const user_prisma = this.__prisma.user.findFirst({
      where: { telegram_id },
    });

    if (!user_prisma) {
      logger.warn(
        `A busca pelo usuário correspondente ao ` +
          `telegram_id (${telegram_id}) não retornou nenhum resultado.`,
      );
      return null;
    }

    logger.info(
      `A busca pelo usuário correspondente ao telegram_id (${telegram_id}) retornou ` +
        'com sucesso do banco de dados.',
    );

    await this.__cache.set(key, JSON.stringify(user_prisma));

    return user_prisma;
  }

  public async create(data: UserCreate): Promise<UserSchema | null> {
    try {
      logger.info(
        `Foi realizada uma solicitação de criação de um ` +
          `novo usuário com o telegram_id (${data.telegram_id}).`,
      );
      const key = `USER::TELEGRAM_ID::${data.telegram_id}`;

      const new_user = await this.__prisma.user.create({ data });

      await this.__cache.set(key, JSON.stringify(new_user));

      logger.warn(
        `Um novo usuário com o telegram_id (${new_user.telegram_id}) foi ` +
          `criado com sucesso. O ID do novo usuário é (${new_user.id}).`,
      );
      return new_user;
    } catch (error) {
      if (error instanceof Error) {
        logger.error((error as Error).message);
      } else {
        logger.error(String(error));
      }
      return null;
    }
  }

  public async findOrCreate(data: UserCreate): Promise<UserSchema | null> {
    try {
      const find_user = await this.findFirst(data.telegram_id);

      if (find_user) {
        return find_user;
      }

      return await this.create(data);
    } catch (error) {
      if (error instanceof Error) {
        logger.error((error as Error).message);
      } else {
        logger.error(String(error));
      }
      return null;
    }
  }
}

export default new User();
