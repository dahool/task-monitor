import { Suspense } from "react"
import JobHistory, { JobHistorySkeleton } from "@/app/ui/history"

export default async function Page( { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <Suspense fallback={<JobHistorySkeleton/>}>
      <JobHistory id={id}/>
    </Suspense>
  );
}