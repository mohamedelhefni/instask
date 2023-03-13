import prisma from "../prisma/client"
import { Event } from "../models/event";
import { createPagination } from "../utils/pagination";

export interface EventsOptions {
    page: number
    limit: number
    actorId?: number
    targetId?: number
    actionId?: number
    name?: string
}

const buildFilterQuery = (options: EventsOptions): any[] => {
    const { actionId, actorId, targetId, name } = options
    const andQuery = []
    if (actorId) andQuery.push({ actorId: actorId })
    if (actionId) andQuery.push({ actionId: actionId })
    if (targetId) andQuery.push({ targetId: targetId })
    return andQuery;
}


const buildSearchQuery = (options: EventsOptions): any => {
    const { name } = options
    const orQuery = []
    if (name) {
        orQuery.push(
            { actor: { name: { search: name } } },
            { action: { name: { search: name } } },
            { target: { name: { search: name } } },
        )
    }
    return orQuery;
}

const buildWhereCondition = (options: EventsOptions): Object => {
    const andQueries = buildFilterQuery(options)
    const orQueries = buildSearchQuery(options)
    const where: { AND?: any[], OR?: any } = { AND: andQueries, OR: orQueries }
    if (andQueries.length == 0) delete where.AND
    if (orQueries.length == 0) delete where.OR
    return where;
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