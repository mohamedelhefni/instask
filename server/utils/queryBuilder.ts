import { Request } from "express"
import { EventsOptions } from "../services/event.service"

export const buildFilterQuery = (options: EventsOptions): any[] => {
  const { actionId, actorId, targetId, name } = options
  const andQuery = []
  if (actorId) andQuery.push({ actorId: actorId })
  if (actionId) andQuery.push({ actionId: actionId })
  if (targetId) andQuery.push({ targetId: targetId })
  return andQuery;
}


export const buildSearchQuery = (options: EventsOptions): any => {
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

export const buildWhereCondition = (options: EventsOptions): Object => {
  const andQueries = buildFilterQuery(options)
  const orQueries = buildSearchQuery(options)
  const where: { AND?: any[], OR?: any } = { AND: andQueries, OR: orQueries }
  if (andQueries.length == 0) delete where.AND
  if (orQueries.length == 0) delete where.OR
  return where;
}

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

