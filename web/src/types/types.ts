interface Action {
    id: number
    object: string
    name: string
}

interface User {
    id: number
    name: string
}

export interface Event {
    object: string
    actor: User
    group: string
    action: Action
    target: User
    location: string
    occurred_at: Date
    metadata: Object
} 