import { Suspense } from "react"
import JobList, { JobListSkeleton } from "./ui/jobs";
import Menu from "./ui/menu";

export default function Home() {
  return (
    <Suspense fallback={<JobListSkeleton/>}>
      <JobList/>
    </Suspense>
  );
}