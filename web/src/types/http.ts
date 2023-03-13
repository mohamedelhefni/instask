import { Event } from "./types"

export interface Pagination {
    next?: number
    prev?: number
    currentPage?: number
    pages?: number
    total?: number
}




export interface EventsResponse {
    events: Event[] | []
    count: number
    pagination: Pagination
}