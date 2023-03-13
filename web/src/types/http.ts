import { Event } from "./types"
export interface EventsResponse {
    events: Event[] | []
    count: number
}