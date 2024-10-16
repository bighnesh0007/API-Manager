'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Key, ArrowRightLeft, LayoutDashboard, ChevronRight } from 'lucide-react'

export default function DocumentationPage() {
  const [activeTab, setActiveTab] = useState('snippets')

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  interface FeatureSectionProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    content: React.ReactNode;
  }

  const FeatureSection = ({ title, description, icon, content }: FeatureSectionProps) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    })

    return (
      <motion.section
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              {icon}
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>{content}</CardContent>
        </Card>
      </motion.section>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Documentation</h1>
        </div>
      </header>

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            <FeatureSection
              title="Snippet Management"
              description="Efficiently organize and manage your code snippets"
              icon={<Code className="w-6 h-6" />}
              content={
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList>
                    <TabsTrigger value="snippets">Snippets</TabsTrigger>
                    <TabsTrigger value="categories">Categories</TabsTrigger>
                    <TabsTrigger value="search">Search</TabsTrigger>
                  </TabsList>
                  <TabsContent value="snippets">
                    Create, edit, and delete your code snippets with ease.
                  </TabsContent>
                  <TabsContent value="categories">
                    Organize snippets into categories for better management.
                  </TabsContent>
                  <TabsContent value="search">
                    Quickly find the snippets you need with powerful search functionality.
                  </TabsContent>
                </Tabs>
              }
            />

            <FeatureSection
              title="API Keys Management"
              description="Securely manage your API keys"
              icon={<Key className="w-6 h-6" />}
              content={
                <ul className="list-disc pl-6 space-y-2">
                  <li>Generate new API keys with customizable permissions</li>
                  <li>Revoke or regenerate existing keys</li>
                  <li>Monitor API key usage and set rate limits</li>
                </ul>
              }
            />

            <FeatureSection
              title="API Management"
              description="Comprehensive tools for API development and monitoring"
              icon={<ArrowRightLeft className="w-6 h-6" />}
              content={
                <ul className="list-disc pl-6 space-y-2">
                  <li>Design and document your APIs with interactive tools</li>
                  <li>Test endpoints directly from the dashboard</li>
                  <li>Monitor API performance and usage analytics</li>
                </ul>
              }
            />

            <FeatureSection
              title="Personalized Dashboard"
              description="Customize your workspace to fit your needs"
              icon={<LayoutDashboard className="w-6 h-6" />}
              content={
                <ul className="list-disc pl-6 space-y-2">
                  <li>Drag-and-drop widgets to create your ideal layout</li>
                  <li>Choose from a variety of themes and color schemes</li>
                  <li>Set up custom notifications and alerts</li>
                </ul>
              }
            />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
            <Button size="lg" className="group">
              Sign Up Now
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  )
}