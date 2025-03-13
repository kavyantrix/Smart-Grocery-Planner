import { Hero } from "@/components/landing/Hero"
import { Features } from "@/components/landing/Features"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Users, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4">
        <header className="py-8">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">PantryPal AI</h1>
            <div className="space-x-4">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Your AI-Powered Grocery Assistant
            </h2>
            <p className="text-xl text-gray-400">
              Transform your grocery shopping experience with personalized recommendations, smart inventory management, and AI-driven meal planning.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-gradient-to-r from-green-400 to-blue-500">
                  Get Started
                </Button>
              </Link>
              <Link href="/learn">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <Features />

        {/* Statistics Section */}
        <section className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 text-center">
              <h3 className="text-4xl font-bold text-green-400">500+</h3>
              <p className="text-gray-400 mt-2">Active Users</p>
            </div>
            <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 text-center">
              <h3 className="text-4xl font-bold text-blue-400">5000+</h3>
              <p className="text-gray-400 mt-2">Lists Generated</p>
            </div>
            <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 text-center">
              <h3 className="text-4xl font-bold text-purple-400">98%</h3>
              <p className="text-gray-400 mt-2">User Satisfaction</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                <ShoppingCart className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold">Create Your List</h3>
              <p className="text-gray-400">Input your preferences and let AI generate your personalized grocery list</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold">Get Smart Suggestions</h3>
              <p className="text-gray-400">Receive AI-powered recommendations for better shopping decisions</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold">Share & Collaborate</h3>
              <p className="text-gray-400">Easily share lists with family members and shop together</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Grocery Shopping?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already saving time and money with PantryPal AI.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-gradient-to-r from-green-400 to-blue-500">
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">PantryPal AI</h3>
              <p className="text-gray-400">Making grocery shopping smarter and easier.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/learn">Learn More</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/privacy">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="https://twitter.com">Twitter</Link></li>
                <li><Link href="https://github.com">GitHub</Link></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
