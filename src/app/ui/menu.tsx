import Link from "next/link"
import { HiSwatch } from "react-icons/hi2"

export default function Menu() {
  return (
    <header className="bg-white shadow-md rounded-lg px-6 py-4 flex justify-between items-center">
        <Link href={"/"}><h1 className="text-xl font-semibold flex items-center"><HiSwatch className="mr-2" /> Job Monitor</h1></Link>
        {/*
        <nav className="space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-800">Pricing</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Docs</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Blog</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">About</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Account</a>
        </nav>
        */}
    </header>
  );
}
