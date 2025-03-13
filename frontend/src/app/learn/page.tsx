import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Learn More | PantryPal AI",
  description: "Learn about PantryPal AI's features and how it can help you manage your grocery shopping more efficiently.",
}

export default function LearnMore() {
  return (
    <main className="min-h-screen bg-gray-950">
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              About PantryPal AI
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              PantryPal AI is your intelligent grocery shopping companion that combines AI technology with practical shopping features to make your grocery management effortless.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    AI-powered grocery list generation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    Smart inventory management
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    Expiration date tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    Budget optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    Collaborative shopping lists
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    Intelligent chatbot assistant
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    Personalized recommendations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    Family account sharing
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
                <div className="space-y-4 text-gray-300">
                  <p className="flex items-start gap-3">
                    <span className="font-bold text-blue-400">1.</span>
                    Set up your profile with dietary preferences and family size
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="font-bold text-blue-400">2.</span>
                    Get AI-generated grocery recommendations
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="font-bold text-blue-400">3.</span>
                    Manage your shopping lists and track inventory
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="font-bold text-blue-400">4.</span>
                    Receive smart notifications for expiring items
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="font-bold text-blue-400">5.</span>
                    Chat with AI assistant for shopping advice
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="font-bold text-blue-400">6.</span>
                    Share lists and collaborate with family members
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}