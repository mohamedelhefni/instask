import prisma from "../prisma/client"
import { Event } from "../models/event";
import { createPagination } from "../utils/pagination";
import { buildWhereCondition } from "../utils/queryBuilder";
import HttpException from "../models/HttpException";

export interface EventsOptions {
  page: number
  limit: number
  actorId?: number
  targetId?: number
  actionId?: number
  name?: string
}



export const getEvents = async (options: EventsOptions) => {
  const { page, limit } = options;
  const maxLimit = limit >= 100 ? 20 : limit
  const startIndex = (page - 1) * maxLimit;
  const whereCondition = buildWhereCondition(options)
  const eventsCount = await prisma.event.count({ where: whereCondition });
  const events = await prisma.event.findMany({
    where: whereCondition,
    skip: startIndex,
    take: maxLimit,
    orderBy: {
      createdAt: 'desc',
    },
    include: { action: true, actor: true, target: true },

  })
  return {
    events: events,
    count: eventsCount,
    pagination: createPagination(page, maxLimit, eventsCount),
  }
}


export const createEvent = async (eventObject: Event) => {
  const { object, actor, group, action, target, location, occurred_at, metadata } = eventObject;
  if (!object) {
    throw new HttpException(400, { errors: { object: ["can't be blank"] } })
  }
  if (!actor) {
    throw new HttpException(400, { errors: { actor: ["can't be blank"] } })
  }
  const event = await prisma.event.create({
    data: {
      object: object,
      actor: {
        connectOrCreate: {
          create: {
            name: actor.name
          },
          where: {
            id: actor.id
          }
        }
      },
      group: group,
      action: {
        connectOrCreate: {
          create: {
            object: action.object,
            name: action.name
          },
          where: {
            id: action.id
          }
        }
      },
      target: {
        connectOrCreate: {
          create: {
            name: target.name
          },
          where: {
            id: target.id
          }
        }
      },
      location: location,
      occurred_at: occurred_at,
      metadata: metadata
    }
  })
  return event;
}
