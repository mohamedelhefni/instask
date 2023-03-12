import { Event } from "../models/event";
import axios from "axios";

const BASE_URL = "http://localhost:8000"

export class InstaLog {
    key: string = "";
    static axios = axios.create({ baseURL: BASE_URL })
    constructor(key: string) {
        this.key = key;
    }

    createEvent(event: Event) {
        const { object, actor, group, action, target, location, occurred_at, metadata } = event;
        return InstaLog.axios.post(`/events`, {
            "object": object,
            "actor": action,
            "group": group,
            "action": action,
            "target": target,
            "location": location,
            "occurred_at": occurred_at,
            "metadata": metadata
        })
    }

    listEvents() {
        return InstaLog.axios.get(`/events`);
    }
}
