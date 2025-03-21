import Link from "next/link"
import { HiSwatch } from "react-icons/hi2"

export default function Menu() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-6 py-4 flex justify-between items-center">
        <Link href={"/"}>
            <h1 className="text-xl font-semibold flex items-center text-gray-700 dark:text-gray-300">
                <HiSwatch className="mr-2" /> Job Monitor
            </h1>
        </Link>
        {/*
        <nav className="space-x-6">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">Pricing</a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">Docs</a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">Blog</a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">About</a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">Account</a>
        </nav>
        */}
    </header>
  );
}
