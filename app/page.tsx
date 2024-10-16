'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Key, ArrowRightLeft, LayoutDashboard, ChevronRight, Check } from 'lucide-react'
import { HiLightningBolt, HiCog, HiChartBar, HiShieldCheck } from 'react-icons/hi'

const MotionCard = motion(Card)

export default function LandingPage() {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Streamline Your Development Workflow
          </motion.h1>
          <motion.p 
            className="text-xl sm:text-2xl text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Manage snippets, API keys, and more with our all-in-one developer hub
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button size="lg" className="mr-4">Get Started</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            <MotionCard variants={fadeInUp}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2" />
                  Snippet Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                Organize and access your code snippets efficiently across projects.
              </CardContent>
            </MotionCard>
            <MotionCard variants={fadeInUp}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="mr-2" />
                  API Keys Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                Securely store and manage all your API keys in one place.
              </CardContent>
            </MotionCard>
            <MotionCard variants={fadeInUp}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ArrowRightLeft className="mr-2" />
                  API Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                Design, test, and monitor your APIs with ease.
              </CardContent>
            </MotionCard>
            <MotionCard variants={fadeInUp}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LayoutDashboard className="mr-2" />
                  Personalized Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                Customize your workspace to fit your unique workflow.
              </CardContent>
            </MotionCard>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <motion.div 
            className="space-y-12"
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={staggerChildren}
          >
            <motion.div className="flex items-center" variants={fadeInUp}>
              <div className="flex-shrink-0 mr-4">
                <HiLightningBolt className="text-4xl text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">1. Sign Up and Connect</h3>
                <p>Create your account and connect your development tools and APIs.</p>
              </div>
            </motion.div>
            <motion.div className="flex items-center" variants={fadeInUp}>
              <div className="flex-shrink-0 mr-4">
                <HiCog className="text-4xl text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">2. Customize Your Dashboard</h3>
                <p>Set up your personalized workspace with the tools you use most.</p>
              </div>
            </motion.div>
            <motion.div className="flex items-center" variants={fadeInUp}>
              <div className="flex-shrink-0 mr-4">
                <HiChartBar className="text-4xl text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">3. Manage and Monitor</h3>
                <p>Efficiently manage your snippets, API keys, and monitor your API usage.</p>
              </div>
            </motion.div>
            <motion.div className="flex items-center" variants={fadeInUp}>
              <div className="flex-shrink-0 mr-4">
                <HiShieldCheck className="text-4xl text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">4. Secure and Scale</h3>
                <p>Rest easy with our secure platform and scale your development as you grow.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Developers Say</h2>
          <Tabs defaultValue="testimonial1" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="testimonial1">Alex M.</TabsTrigger>
              <TabsTrigger value="testimonial2">Sarah K.</TabsTrigger>
              <TabsTrigger value="testimonial3">David L.</TabsTrigger>
            </TabsList>
            <TabsContent value="testimonial1">
              <Card>
                <CardHeader>
                  <CardTitle>Alex M.</CardTitle>
                  <CardDescription>Full Stack Developer</CardDescription>
                </CardHeader>
                <CardContent>
                &quot;This platform has revolutionized my workflow. I can access my snippets and manage API keys effortlessly!&quot;
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="testimonial2">
              <Card>
                <CardHeader>
                  <CardTitle>Sarah K.</CardTitle>
                  <CardDescription>API Architect</CardDescription>
                </CardHeader>
                <CardContent>
                &quot;The API management tools are top-notch. It&apos;s made our team&apos;s collaboration so much smoother.&quot;
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="testimonial3">
              <Card>
                <CardHeader>
                  <CardTitle>David L.</CardTitle>
                  <CardDescription>Startup CTO</CardDescription>
                </CardHeader>
                <CardContent>
                &quot;The personalized dashboard is a game-changer. I can see all my development metrics at a glance.&quot;
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>For individual developers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold mb-4">$9<span className="text-xl font-normal">/month</span></p>
                <ul className="space-y-2">
                  <li className="flex items-center"><Check className="mr-2 text-green-500" /> 100 Snippets</li>
                  <li className="flex items-center"><Check className="mr-2 text-green-500" /> 10 API Keys</li>
                  <li className="flex items-center"><Check className="mr-2 text-green-500" /> Basic API Management</li>
                  <li className="flex items-center"><Check className="mr-2 text-green-500" /> Standard Dashboard</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Choose Starter</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For growing teams</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold mb-4">$29<span className="text-xl font-normal">/month</span></p>
                <ul className="space-y-2">
                  <li className="flex items-center"><Check className="mr-2 text-green-500" /> Unlimited Snippets</li>
                  <li className="flex items-center"><Check className="mr-2 text-green-500" /> 100 API Keys</li>
                  <li className="flex items-center"><Check className="mr-2 text-green-500" /> Advanced API Management</li>
                  <li className="flex items-center"><Check className="mr-2 text-green-500" /> Custom Dashboard</li>
                  <li className="flex items-center"><Check className="mr-2 text-green-500" /> Team Collaboration</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Choose Pro</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For large organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold mb-4">Custom</p>
                <ul className="space-y-2">
                  <li className="flex items-center"><Check className="mr-2 text-green-500" /> Unlimited Everything</li>
                  <li className="flex items-center"><Check className="mr-2 text-green-500" /> Advanced Security</li>
                  <li className="flex items-center"><Check className="mr-2 text-green-500" /> Dedicated Support</li>
                  <li className="flex items-center"><Check className="mr-2 text-green-500" /> Custom Integrations</li>
                  <li className="flex items-center"><Check className="mr-2 text-green-500" /> SLA</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Contact Sales</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Supercharge Your Development?</h2>
          <p className="text-xl mb-8">Join thousands of developers who are already using our platform to streamline their workflow.</p>
          <Button size="lg" variant="secondary" className="group">
            Get Started Now
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div  className="mb-4 md:mb-0">
            <Image src="/placeholder.svg" alt="DevHub Logo" width={120} height={40} />
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end space-x-4">
            <a href="#" className="hover:text-blue-400">Features</a>
            <a href="#" className="hover:text-blue-400">Pricing</a>
            <a href="#" className="hover:text-blue-400">Documentation</a>
            <a href="#" className="hover:text-blue-400">Blog</a>
            <a href="#" className="hover:text-blue-400">About</a>
            <a href="#" className="hover:text-blue-400">Contact</a>
          </nav>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          © 2023 DevHub. All rights reserved.
        </div>
      </footer>
    </div>
  )
}