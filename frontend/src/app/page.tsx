import Image from 'next/image'
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4">
        <header className="py-8">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Smart Grocery Planner</h1>
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

        <main className="py-20">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Plan Your Groceries Smartly
            </h2>
            <p className="text-xl text-gray-400">
              AI-powered grocery planning that helps you save time, reduce waste, and eat healthier.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-gradient-to-r from-green-400 to-blue-500">
                  Get Started
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
