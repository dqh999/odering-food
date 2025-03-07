"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"

interface LoadingAnimationProps {
    title?: string
    message?: string
}

export default function LoadingAnimation({ title = "Loading...", message = "Please wait..." }: LoadingAnimationProps) {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
                <Card className="border-border shadow-lg p-8">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <motion.div
                            className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        >
                            <Loader2 className="h-8 w-8 text-primary animate-spin" />
                        </motion.div>

                        <motion.div
                            className="space-y-2 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-xl font-semibold">{title}</h2>
                            <p className="text-sm text-muted-foreground">{message}</p>
                        </motion.div>

                        {/* Loading dots animation */}
                        <div className="flex space-x-2 pt-4">
                            {[0, 1, 2].map((index) => (
                                <motion.div
                                    key={index}
                                    className="w-2 h-2 rounded-full bg-primary"
                                    initial={{ opacity: 0.3 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        duration: 0.6,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "reverse",
                                        delay: index * 0.2,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </Card>
            </motion.div>
        </main>
    )
}
