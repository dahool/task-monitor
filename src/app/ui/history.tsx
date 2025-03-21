import { getJob, getJobHistory, listJobs } from "@/server/repository"
import { toHumanDuration } from "../utils"
import StatusBadge from "./badge"
import { ImTerminal } from "react-icons/im"
import ConsoleDialog from "./console"

export default async function JobHistory({id}: {id: string}) {
    const job = await getJob(id)
    const history = await getJobHistory(id);
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg mt-4 px-6 py-4">
            <h3 className="mb-3 text-gray-600 dark:text-gray-300 font-bold">{job.name}</h3>
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-600">
                        <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300">Execution Time</th>
                        <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300">Status</th>
                        <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300">Duration</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                    history.map((item, index) => (
                    <tr key={index} className="border-b dark:border-gray-600">
                        <td className="py-2 px-4 flex items-center text-gray-700 dark:text-gray-300">
                            {item.timestamp.toFormat('dd-MM-yyyy HH:mm')} ({item.timestamp.toRelative()})
                        </td>
                        <td className="py-2 px-4 space-x-2 text-gray-700 dark:text-gray-300">
                            <StatusBadge text={item.status} />
                        </td>
                        <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                            {toHumanDuration(item.duration ?? 0)}
                        </td>
                        <td>
                            <ConsoleDialog>{item.output}</ConsoleDialog>
                        </td>
                    </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export const JobHistorySkeleton = () => {
    return (
        <>
            <h3 className="bg-gray-300 h-6 w-48 rounded animate-pulse"></h3>
            <div className="bg-white shadow-md rounded-lg mt-4 px-6 py-4">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-2 px-4 text-left">Execution Time</th>
                            <th className="py-2 px-4 text-left">Status</th>
                            <th className="py-2 px-4 text-left">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3].map((_, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 px-4">
                                    <div className="bg-gray-300 h-5 w-36 rounded animate-pulse"></div>
                                </td>
                                <td className="py-2 px-4">
                                    <div className="bg-gray-300 h-5 w-24 rounded animate-pulse"></div>
                                </td>
                                <td className="py-2 px-4">
                                    <div className="bg-gray-300 h-5 w-28 rounded animate-pulse"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
