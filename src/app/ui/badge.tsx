import { JobStatus } from "@/server/model"
import clsx from "clsx"

export default function StatusBadge({text}: {text: string}) {
    return (
        <span
            className={clsx(
            'flex h-fit items-center gap-1 font-semibold p-1 text-xs rounded px-2 py-0.5',
            {
                'bg-green-100 text-green-800': text == JobStatus.SUCCESS,
                'bg-red-100 text-red-800': text == JobStatus.FAILURE,
                'bg-blue-100 text-blue-800': text == JobStatus.RUNNING,
                'bg-slate-100 text-slate-800': text == JobStatus.PENDING
            },
            )}
            >
            {text}
        </span>
    )
}






