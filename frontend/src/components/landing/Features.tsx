import { 
  Sparkles, 
  ClipboardList, 
  Wallet,
  Calendar,
  MessageSquare,
  Users
} from "lucide-react"

export function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-400">Smart Shopping</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to shop smarter
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  {feature.icon}
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    name: 'AI-Powered Lists',
    description: 'Get personalized grocery recommendations based on your family size, dietary restrictions, and preferences.',
    icon: <Sparkles className="h-5 w-5 text-blue-400" />
  },
  {
    name: 'Smart Inventory',
    description: 'Track your groceries, get expiration alerts, and never run out of essentials.',
    icon: <ClipboardList className="h-5 w-5 text-blue-400" />
  },
  {
    name: 'Budget Tracking',
    description: 'Stay within budget with smart price tracking and cost-effective alternatives.',
    icon: <Wallet className="h-5 w-5 text-blue-400" />
  },
  {
    name: 'Meal Planning',
    description: 'Get AI-generated meal suggestions based on your available ingredients and preferences.',
    icon: <Calendar className="h-5 w-5 text-blue-400" />
  },
  {
    name: 'Shopping Assistant',
    description: 'Chat with our AI assistant for recipe ideas, cooking tips, and shopping advice.',
    icon: <MessageSquare className="h-5 w-5 text-blue-400" />
  },
  {
    name: 'Family Sharing',
    description: 'Collaborate on shopping lists and share responsibilities with family members.',
    icon: <Users className="h-5 w-5 text-blue-400" />
  }
]