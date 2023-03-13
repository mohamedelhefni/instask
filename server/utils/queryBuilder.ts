import { Request } from "express"
import { EventsOptions } from "../services/event.service"
export const getOptions = (request: Request): EventsOptions => {
    const options: EventsOptions = { page: 1, limit: 20 }
    const query = request.query
    if ("page" in query) options.page = Number(query?.page)
    if ("limit" in query) options.limit = Number(query?.limit)
    if ("actionId" in query) options.actionId = Number(query?.actionId)
    if ("actorId" in query) options.actorId = Number(query?.actorId)
    if ("targetId" in query) options.targetId = Number(query?.targetId)
    if ("name" in query) options.name = String(query?.name)
    return options
}
