"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Send, MessageCircle, X } from "lucide-react"
import { api } from "@/lib/axios"
import { toast } from "sonner"

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  createdAt: string
}

// Add interface for API response
interface ChatResponse {
  message: string
}

interface ChatHistoryResponse {
  data: Message[]
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadChatHistory()
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const loadChatHistory = async () => {
    try {
      const response = await api.get<Message[]>('/ai/chat-history')
      setMessages(response.data)
    } catch (error) {
      console.error('Failed to load chat history:', error)
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return

    try {
      setIsLoading(true)
      const userMessage = input
      setInput("")
      
      // Add user message immediately
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: userMessage,
        role: 'user',
        createdAt: new Date().toISOString()
      }])

      const response = await api.post<ChatResponse>('/ai/chat', {
        message: userMessage,
        chatHistory: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      })

      // Add AI response
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: response.data.message,
        role: 'assistant',
        createdAt: new Date().toISOString()
      }])
    } catch (error) {
      console.error('Chat error:', error)
      toast.error('Failed to send message')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="relative">
          <Card className="w-[380px] bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Grocery Assistant</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-[400px] pr-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-100'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about grocery shopping..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-gray-800 border-gray-700 text-white"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}
    </div>
  )
}