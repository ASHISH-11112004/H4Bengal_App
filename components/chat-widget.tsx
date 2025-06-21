"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, X, Send, Bot, User, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import SimpleMarkdown from "@/components/ui/simple-markdown"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  error?: boolean
}

const WEBHOOK_URL = "https://guptag.app.n8n.cloud/webhook/c86c73ac-1f3a-4b4b-84a9-ecf98c789132"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === 'undefined') {
      return [
        { id: "1", text: "Hello! I'm here to help you with your rental agreement questions. How can I assist you today?", sender: "bot", timestamp: new Date() }
      ];
    }
    try {
      const storedMessages = window.localStorage.getItem("chat-messages");
      if (!storedMessages) {
        return [
            { id: "1", text: "Hello! I'm here to help you with your rental agreement questions. How can I assist you today?", sender: "bot", timestamp: new Date() }
        ];
      }
      const parsedMessages = JSON.parse(storedMessages) as Message[];
      return parsedMessages.map(m => ({...m, timestamp: new Date(m.timestamp)}));
    } catch (error) {
      console.error("Failed to parse messages from localStorage", error);
      return [
        { id: "1", text: "Hello! I'm here to help you with your rental agreement questions. How can I assist you today?", sender: "bot", timestamp: new Date() }
      ];
    }
  });
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem("chat-messages", JSON.stringify(messages));
      }
    } catch (error) {
      console.error("Failed to save messages to localStorage", error);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsTyping(true)
    setIsLoading(true)

    try {
      const requestData = {
        message: currentInput,
        timestamp: new Date().toISOString(),
        userId: "user-" + Date.now(),
      }

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      let botResponse = ""
      if (typeof data === "string") {
        botResponse = data
      } else if (data.output) {
        botResponse = data.output
      } else if (data.response) {
        botResponse = data.response
      } else if (data.message) {
        botResponse = data.message
      } else if (data.text) {
        botResponse = data.text
      } else if (data.content) {
        botResponse = data.content
      } else {
        botResponse = "I received a response, but I'm having trouble understanding it."
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error calling webhook:", error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I'm sorry, I'm having trouble connecting to my services right now. Please try again in a moment.`,
        sender: "bot",
        timestamp: new Date(),
        error: true,
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  return (
    <>
      {/* Chat Widget (fixed above the button) */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50">
          <Card className="w-80 h-96 shadow-2xl border-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/assets/TenuntTrust (1).png" alt="TenantTrust" />
                    <AvatarFallback>TT</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm">TenantTrust Support</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {isLoading ? "Connecting..." : "Online"}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-0 flex flex-col h-full pb-6">
              <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
                <div className="space-y-4 pb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-2",
                        message.sender === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.sender === "bot" && (
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/assets/TenuntTrust (1).png" alt="Bot" />
                          <AvatarFallback>
                            {message.error ? (
                              <AlertCircle className="h-3 w-3 text-destructive" />
                            ) : (
                              <Bot className="h-3 w-3" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : message.error
                            ? "bg-destructive/10 text-destructive border border-destructive/20"
                            : "bg-muted"
                        )}
                      >
                        {message.sender === 'bot' ? <SimpleMarkdown text={message.text} /> : message.text}
                      </div>
                      {message.sender === "user" && (
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>
                            <User className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-2 justify-start">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/assets/TenuntTrust (1).png" alt="Bot" />
                        <AvatarFallback>
                          <Bot className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isLoading ? "Please wait..." : "Type your message..."}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    disabled={!inputValue.trim() || isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Chat Toggle Button (always fixed at bottom right) */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </>
  )
} 