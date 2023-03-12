import { Prisma } from "@prisma/client"

export interface Event {
    object: string
    actor: User
    group: string
    action: Action
    target: User
    location: string
    occurred_at: Date
    metadata: Prisma.JsonObject
}