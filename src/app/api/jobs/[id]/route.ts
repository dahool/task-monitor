import { JobStatus } from '@/server/model'
import { startJob, updateJobStatus } from '@/server/repository'
import { NextRequest } from 'next/server'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const data = await req.json()
    await updateJobStatus(id, data.status === "true" ? JobStatus.SUCCESS : JobStatus.FAILURE, data.duration, data.output)
    return new Response()
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const data = await req.json()
    await startJob(id, data.name)
    return new Response()
}
