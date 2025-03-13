import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Your AI-Powered Grocery Assistant
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            PantryPal AI revolutionizes your grocery shopping experience with personalized recommendations, smart inventory management, and AI-driven meal planning.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button asChild size="lg">
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/learn">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}