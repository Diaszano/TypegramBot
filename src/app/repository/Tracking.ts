import { PrismaClient } from '@prisma/client';
import logger from '../libs/Logger';
import Cache from 'dzn-cache';
import cache from '../libs/Cache';
import { Tracking as TrackingSchema } from '../schema/Tracking';
import Linketrack from 'linketrackjs';
import linketrack from '../libs/LinkeTrack';

class Tracking {
  constructor(
    private readonly __prisma: PrismaClient = new PrismaClient(),
    private readonly __cache: Cache = cache,
    private readonly __linketrack: Linketrack = linketrack,
  ) {}

  public async findOrCreate(code: string): Promise<TrackingSchema | null> {
    logger.info(`Realizou-se uma busca pelo código de rastreio (${code}).`);
    const key = `TRACKING::CODE::${code}`;

    const tracking_cache: string | null = await this.__cache.get(key);

    if (tracking_cache) {
      logger.info(
        `A busca pelo código de rastreio (${code}) retornou com sucesso da cache.`,
      );
      return JSON.parse(tracking_cache);
    }

    logger.info(
      `Será feita uma busca pelo código de rastreio (${code}) no link & track.`,
    );

    const tracking_prisma = await this.__prisma.tracking.findFirst({
      where: { code },
    });
    const track: string = JSON.stringify(await this.__linketrack.track(code));

    if (tracking_prisma === null) {
      const new_tracking = await this.__prisma.tracking.create({
        data: { code: code, data: track },
      });

      await this.__cache.set(key, JSON.stringify(new_tracking), 900);
      return new_tracking;
    }

    if (tracking_prisma.data === track) {
      await this.__cache.set(key, JSON.stringify(tracking_prisma), 900);
      return tracking_prisma;
    }

    const update_tracking = await this.__prisma.tracking.update({
      where: { code },
      data: { data: track },
    });

    await this.__cache.set(key, JSON.stringify(update_tracking), 900);
    return update_tracking;
  }
}

export default new Tracking();
