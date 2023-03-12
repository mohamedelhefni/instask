import { Prisma } from "@prisma/client"

interface Action {
    id: number
    object: string
    name: string
}

interface Actor {
    id: number
    name: string
}

interface Target {
    id: number
    name: string
}

export interface EventRequest {
    object: string
    actor: Actor
    group: string
    action: Action
    target: Target
    location: string
    occurred_at: Date
    metadata: Prisma.JsonObject
}