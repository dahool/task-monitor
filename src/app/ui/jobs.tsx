import { listJobs } from "@/server/repository"
import { toHumanDuration } from "../utils"
import StatusBadge from "./badge"
import Link from "next/link"
import { MdManageHistory } from "react-icons/md"

export default async function JobList() {
    const jobs = await listJobs()
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg mt-4 px-6 py-4">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700 border-b">
                        <th></th>
                        <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300">Name</th>
                        <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300 hidden md:block">UUID</th>
                        <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300">Status</th>
                        <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300">Last Run</th>
                        <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300 hidden md:block">Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    jobs.map((job, index) => (
                    <tr key={index} className="border-b dark:border-gray-600">
                        <td className="py-2 px-4"><Link href={`/job/${job.uuid}`} title="Execution History"><MdManageHistory /></Link></td>
                        <td className="py-2 px-4 flex items-center text-gray-700 dark:text-gray-300">{job.name}</td>
                        <td className="py-2 px-4 text-gray-700 dark:text-gray-300 hidden md:table-cell">{job.uuid}</td>
                        <td className="py-2 px-4 space-x-2 text-gray-700 dark:text-gray-300"><StatusBadge text={job.status}/></td>
                        <td className="py-2 px-4 text-gray-700 dark:text-gray-300">{job.lastRun?.toRelative()}</td>
                        <td className="py-2 px-4 text-gray-700 dark:text-gray-300 hidden md:table-cell">{toHumanDuration(job.duration ?? 0)}</td>
                    </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export const JobListSkeleton = () => {
    return (
        <div className="bg-white shadow-md rounded-lg mt-4 px-6 py-4 animate-pulse">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-2 px-4 text-left">Name</th>
                        <th className="py-2 px-4 text-left">UUID</th>
                        <th className="py-2 px-4 text-left">Status</th>
                        <th className="py-2 px-4 text-left">Last Run</th>
                        <th className="py-2 px-4 text-left">Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Skeleton Row 1 */}
                    <tr className="border-b">
                        <td className="py-2 px-4">
                            <div className="h-4 bg-gray-300 rounded w-20"></div>
                        </td>
                        <td className="py-2 px-4">
                            <div className="h-4 bg-gray-300 rounded w-20"></div>
                        </td>
                        <td className="py-2 px-4">
                            <div className="h-4 bg-gray-300 rounded w-24"></div>
                        </td>
                        <td className="py-2 px-4">
                            <div className="h-4 bg-gray-300 rounded w-16"></div>
                        </td>
                        <td className="py-2 px-4">
                            <div className="h-4 bg-gray-300 rounded w-28"></div>
                        </td>
                    </tr>
                    {/* Skeleton Row 2 */}
                    <tr className="border-b">
                        <td className="py-2 px-4">
                            <div className="h-4 bg-gray-300 rounded w-20"></div>
                        </td>
                        <td className="py-2 px-4">
                            <div className="h-4 bg-gray-300 rounded w-20"></div>
                        </td>
                        <td className="py-2 px-4">
                            <div className="h-4 bg-gray-300 rounded w-24"></div>
                        </td>
                        <td className="py-2 px-4">
                            <div className="h-4 bg-gray-300 rounded w-16"></div>
                        </td>
                        <td className="py-2 px-4">
                            <div className="h-4 bg-gray-300 rounded w-28"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
