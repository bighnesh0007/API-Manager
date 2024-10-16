'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Ghost, Home, Search, LogIn, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { SignInButton } from '@clerk/nextjs'

export default function NotFound() {
    const [searchQuery, setSearchQuery] = useState('')
    const [showSignInHint, setShowSignInHint] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => setShowSignInHint(true), 5000)
        return () => clearTimeout(timer)
    }, [])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-200">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80"
            >
                <motion.div
                    animate={{
                        rotate: [0, 10, -10, 10, -10, 0],
                        scale: [1, 1.1, 1, 1.1, 1]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 5,
                        repeatType: "reverse"
                    }}
                    className="relative"
                >
                    <Ghost className="w-32 h-32 mx-auto text-gray-400 dark:text-gray-500" />
                    <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                    >
                        👻
                    </motion.div>
                </motion.div>
                <h1 className="mt-8 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">404 - Page Not Found</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Oops! The page you&apos;re looking for seems to have vanished into thin air.</p>

                <form onSubmit={handleSearch} className="mt-8 flex gap-2">
                    <Input
                        type="text"
                        placeholder="Search for content..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-grow shadow-sm focus:ring-2 focus:ring-purple-500 dark:focus:ring-pink-500 transition-shadow duration-200"
                    />
                    <Button type="submit" className="bg-purple-500 hover:bg-purple-600 dark:bg-pink-500 dark:hover:bg-pink-600 transition-colors duration-200">
                        <Search className="mr-2 h-4 w-4" /> Search
                    </Button>
                </form>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild variant="default" className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-gray-800 transition-colors duration-200">
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" /> Go back home
                        </Link>
                    </Button>
                    <SignInButton mode="modal">
                        <Button variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white dark:border-pink-500 dark:text-pink-500 dark:hover:bg-pink-500 dark:hover:text-white transition-colors duration-200">
                            <LogIn className="mr-2 h-4 w-4" /> Sign In
                        </Button>
                    </SignInButton>
                </div>

                <AnimatePresence>
                    {showSignInHint && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="mt-8 text-sm text-gray-500 dark:text-gray-400"
                        >
                            Lost? Try signing in to access your personalized content.
                        </motion.p>
                    )}
                </AnimatePresence>

                <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
                    <p>Need help? Check out our <Link href="/faq" className="text-purple-500 dark:text-pink-500 hover:underline">FAQ</Link> or <Link href="/contact" className="text-purple-500 dark:text-pink-500 hover:underline">contact support</Link>.</p>
                </div>

                <motion.div 
                    className="mt-8 text-xs text-gray-400 dark:text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <Link href="/sitemap" className="hover:text-purple-500 dark:hover:text-pink-500 transition-colors duration-200">Sitemap</Link> | 
                    <Link href="/privacy" className="ml-2 hover:text-purple-500 dark:hover:text-pink-500 transition-colors duration-200">Privacy Policy</Link> | 
                    <Link href="/terms" className="ml-2 hover:text-purple-500 dark:hover:text-pink-500 transition-colors duration-200">Terms of Service</Link>
                </motion.div>
            </motion.div>
            <motion.a 
                href="https://github.com/bighnesh0007/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 text-gray-500 hover:text-purple-500 dark:hover:text-pink-500 transition-colors duration-200 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <ExternalLink className="mr-2 h-4 w-4" /> View on GitHub
            </motion.a>
        </div>
    )
}