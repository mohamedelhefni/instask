import prisma from "../prisma/client"
import { Event } from "../models/event";

export const getEvents = async (query: string) => {
    const eventsCount = await prisma.event.count();
    const events = await prisma.event.findMany({
        include: { action: true, actor: true, target: true }
    })
    return {
        events: events,
        count: eventsCount
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