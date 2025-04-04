'use server'
import { DateTime } from "luxon"
import { Job, JobHistory, JobStatus } from "./model"
import { Database } from 'sqlite3'
import { environment } from "@/env/environment"
import * as path from 'upath';

const DB_FILE = path.resolve(path.join(environment.path.database, 'db.sqlite'))
const db = new Database(DB_FILE)

export async function initializeDb() {
    console.log("Initialize database", DB_FILE)
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS jobs (uuid TEXT PRIMARY KEY, name TEXT, status TEXT, lastRun INTEGER, duration INTEGER)")
        db.run("CREATE TABLE IF NOT EXISTS history (id INTEGER PRIMARY KEY AUTOINCREMENT, uuid TEXT, status TEXT, timestamp INTEGER, duration INTEGER, output TEXT)")
        db.run("CREATE INDEX IF NOT EXISTS uuid_idx ON history(uuid)")
    });
}

export async function listJobs(): Promise<Job[]> {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM jobs ORDER BY lastRun DESC", [],
            (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows.map((row: any) => ({
                        name: row.name,
                        uuid: row.uuid,
                        status: row.status,
                        lastRun: DateTime.fromMillis(row.lastRun),
                        duration: row.duration
                    })))
                }
            }
        )
    })
}

export async function getJobHistory(uuid: string): Promise<JobHistory[]> {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM history WHERE uuid = ? ORDER BY id DESC LIMIT 10", [uuid], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                if (!rows) {
                    resolve([])
                } else {
                    resolve(rows.map((row: any) => ({
                        id: row.id,
                        uuid: row.uuid,
                        status: row.status,
                        timestamp: DateTime.fromMillis(row.timestamp),
                        duration: row.duration,
                        output: Buffer.from(row.output, 'base64').toString('utf-8')
                    })))
                }
            }
        }
    )})
}

export async function getJob(uuid: string): Promise<Job> {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM jobs WHERE uuid = ?", [uuid], (err, row: any) => {
            if (err) {
                reject(err)
            } else {
                if (!row) {
                    reject(`Job with ID ${uuid} not found`)
                } else {
                    resolve({
                        name: row.name,
                        uuid: row.uuid,
                        status: row.status,
                        lastRun: DateTime.fromMillis(row.lastRun),
                        duration: row.duration
                    })
                }
            }
        }
    )})
}

export async function updateJob(uuid: string, name: string): Promise<void> {
    return
}

export async function deleteJob(uuid: string): Promise<void> {
    return
}

export async function updateJobStatus(uuid: string, status: string, duration: number, output: string): Promise<void> {
    db.get("SELECT * FROM jobs WHERE uuid = ?", [uuid], (err, row: any) => {
        if (err) { return }
        if (row) {  // update
            db.run("UPDATE jobs SET status = ?, duration = ? WHERE uuid = ?", [status, duration, uuid])
        } else {  // insert
            db.run("INSERT INTO jobs (uuid, name, status, lastRun, duration) VALUES (?, ?, ?, ?, ?)", [uuid, `Job ${uuid}`, status, DateTime.now().toMillis(), duration])
        }
        db.run("INSERT INTO history (uuid, status, timestamp, duration, output) VALUES (?, ?, ?, ?, ?)", [uuid, status, row ? row.lastRun : DateTime.now().toMillis(), duration, output])
    })
    return
}

export async function startJob(uuid: string, name: string): Promise<void> {
    db.get("SELECT * FROM jobs WHERE uuid = ?", [uuid], (err, row) => {
        if (err) { return }
        if (row) {  // update
            db.run("UPDATE jobs SET status = ?, lastRun = ?, duration = ?, name = ? WHERE uuid = ?", [JobStatus.RUNNING, DateTime.now().toMillis(), null, name, uuid])
        }
        else {  // insert
            db.run("INSERT INTO jobs (uuid, name, status, lastRun) VALUES (?, ?, ?, ?)", [uuid, name, JobStatus.RUNNING, DateTime.now().toMillis()])
        }
    })
    return
}