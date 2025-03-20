import { DateTime } from 'luxon'

export const JobStatus = {
    SUCCESS: "success",
    FAILURE: "failure",
    RUNNING: "running",
    PENDING: "pending"
}

export interface Job {
    name: string
    uuid: string
    status: string
    lastRun?: DateTime
    duration?: number
}

export interface JobHistory {
    id: number
    uuid: string
    status: string
    timestamp: DateTime
    duration: number
    output: string
}