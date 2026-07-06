import { useCallback, useEffect, useRef, useState } from 'react'
import {
  createMessageId,
  detectMessageChoices,
  getOrCreateSessionId,
  loadPreviousSession,
  sendChatMessage,
  type ChatMessage
} from '../lib/n8nChat'
import './chat-widget.css'

const CHAT_WEBHOOK_URL = import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL

const WELCOME_MESSAGE =
  'Hi there! 👋 I can answer questions about our community and help connect you with our care team.'

const QUICK_REPLIES = [
  'What care options do you offer?',
  'How do I schedule a tour?',
  'What are your visiting hours?'
]

const CHIP_CLASS =
  'chat-chip text-left font-body-sm text-body-sm px-3.5 py-2 rounded-xl border border-outline-variant/50 bg-white/90 text-on-surface shadow-sm hover:border-secondary/70 hover:bg-secondary-container/25 hover:text-primary hover:shadow-md transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-sm'

function ChatIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
      <path d="M3.4 20.4 22 12 3.4 3.6 3 10.8l11.2 1.2L3 13.2l.4 7.2z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  )
}

function CareAvatar({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'w-8 h-8 text-label-sm' : 'w-9 h-9 sm:w-10 sm:h-10 text-label-md'
  const dot = size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'

  return (
    <div className="relative flex-shrink-0">
      <div
        className={`${dim} rounded-full bg-secondary-container flex items-center justify-center text-primary font-label-md shadow-sm ring-2 ring-white/80`}
      >
        CA
      </div>
      <span
        className={`absolute bottom-0 right-0 ${dot} rounded-full bg-emerald-500 border-2 border-white`}
      />
    </div>
  )
}

function UserAvatar() {
  return (
    <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary-container/15 flex items-center justify-center text-primary font-label-sm ring-2 ring-white/80">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-[18px] sm:h-[18px]" aria-hidden>
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 sm:gap-2.5 chat-message-enter">
      <CareAvatar size="sm" />
      <div className="chat-bot-bubble border border-surface-variant/80 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5 h-5">
          <span className="chat-typing-dot w-2 h-2 rounded-full bg-on-surface-variant/70" />
          <span className="chat-typing-dot w-2 h-2 rounded-full bg-on-surface-variant/70" />
          <span className="chat-typing-dot w-2 h-2 rounded-full bg-on-surface-variant/70" />
        </div>
      </div>
    </div>
  )
}

function ChoiceButtons({
  choices,
  onSelect,
  disabled
}: {
  choices: string[]
  onSelect: (choice: string) => void
  disabled?: boolean
}) {
  const isGrid = choices.length >= 3

  return (
    <div
      className={`pl-10 sm:pl-12 chat-message-enter ${
        isGrid ? 'grid grid-cols-1 sm:grid-cols-2 gap-2' : 'flex flex-wrap gap-2'
      }`}
    >
      {choices.map((choice) => (
        <button
          key={choice}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(choice)}
          className={`${CHIP_CLASS} ${isGrid ? 'w-full' : ''}`}
        >
          {choice}
        </button>
      ))}
    </div>
  )
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.sender === 'user'

  return (
    <div
      className={`flex items-end gap-2 sm:gap-2.5 chat-message-enter ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {isUser ? <UserAvatar /> : <CareAvatar size="sm" />}
      <div
        className={`max-w-[min(82%,280px)] sm:max-w-[78%] px-3.5 py-2.5 sm:px-4 sm:py-3 text-body-sm font-body-sm leading-relaxed ${
          isUser
            ? 'chat-user-bubble text-on-primary rounded-2xl rounded-br-md shadow-md shadow-primary/15'
            : 'chat-bot-bubble text-on-surface border border-surface-variant/80 rounded-2xl rounded-bl-md shadow-sm'
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
      </div>
    </div>
  )
}

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < breakpoint
  )

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [breakpoint])

  return isMobile
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const [sessionReady, setSessionReady] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const sessionIdRef = useRef<string>('')
  const prevMessageCountRef = useRef(0)
  const isMobile = useIsMobile()

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior, block: 'end' })
  }, [])

  const scrollToTop = useCallback(() => {
    messagesContainerRef.current?.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const resizeInput = useCallback(() => {
    const el = inputRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 112)}px`
  }, [])

  useEffect(() => {
    if (!CHAT_WEBHOOK_URL) {
      console.warn('VITE_N8N_CHAT_WEBHOOK_URL is not set; chat widget disabled.')
      return
    }

    const sessionId = getOrCreateSessionId()
    sessionIdRef.current = sessionId

    loadPreviousSession(CHAT_WEBHOOK_URL, sessionId)
      .then((history) => {
        if (history.length > 0) {
          setMessages(history)
        } else {
          setMessages([
            {
              id: createMessageId(),
              text: WELCOME_MESSAGE,
              sender: 'bot'
            }
          ])
        }
      })
      .catch(() => {
        setMessages([
          {
            id: createMessageId(),
            text: WELCOME_MESSAGE,
            sender: 'bot'
          }
        ])
      })
      .finally(() => setSessionReady(true))
  }, [])

  useEffect(() => {
    if (!isOpen) return

    setHasUnread(false)

    const messageCount = messages.length
    const isNewMessage = messageCount > prevMessageCountRef.current
    prevMessageCountRef.current = messageCount

    const isWelcomeOnly =
      messageCount <= 2 && messages.every((message) => message.sender === 'bot')

    if (isWelcomeOnly && !isTyping) {
      scrollToTop()
    } else if (isTyping || isNewMessage) {
      scrollToBottom(isTyping ? 'auto' : 'smooth')
    } else if (messageCount > 2) {
      scrollToBottom('auto')
    }

    const timer = window.setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true })
      resizeInput()
    }, isMobile ? 380 : 280)

    return () => window.clearTimeout(timer)
  }, [isOpen, messages, isTyping, scrollToBottom, scrollToTop, isMobile, resizeInput])

  useEffect(() => {
    if (!isOpen || !isMobile) return

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen, isMobile])

  const handleSend = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || !CHAT_WEBHOOK_URL || isTyping) return

    const userMessage: ChatMessage = {
      id: createMessageId(),
      text: trimmed,
      sender: 'user'
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    requestAnimationFrame(resizeInput)
    setIsTyping(true)

    try {
      const reply = await sendChatMessage(
        CHAT_WEBHOOK_URL,
        sessionIdRef.current,
        trimmed
      )

      const botText = reply.text || "Thanks for your message. Our team will follow up shortly."
      const botMessage: ChatMessage = {
        id: createMessageId(),
        text: botText,
        sender: 'bot',
        choices: reply.choices ?? detectMessageChoices(botText)
      }

      setMessages((prev) => [...prev, botMessage])

      if (!isOpen) {
        setHasUnread(true)
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: createMessageId(),
          text: "Sorry, I'm having trouble connecting right now. Please try again or use the contact form below.",
          sender: 'bot'
        }
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    void handleSend(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void handleSend(input)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    requestAnimationFrame(resizeInput)
  }

  if (!CHAT_WEBHOOK_URL) return null

  const showQuickReplies =
    sessionReady &&
    !isTyping &&
    messages.length <= 2 &&
    messages.every((m) => m.sender === 'bot')

  const lastMessage = messages[messages.length - 1]
  const activeChoices =
    sessionReady &&
    !isTyping &&
    lastMessage?.sender === 'bot'
      ? lastMessage.choices ?? detectMessageChoices(lastMessage.text)
      : undefined

  return (
    <div className="chat-root fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-[9999] flex flex-col items-end gap-3">
      {isOpen && isMobile && (
        <button
          type="button"
          aria-label="Close chat"
          className="chat-backdrop fixed inset-0 bg-primary/30 backdrop-blur-[2px] z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {isOpen && (
        <div
          role="dialog"
          aria-label="Care assistant chat"
          aria-modal={isMobile}
          className="chat-panel fixed inset-x-0 bottom-0 sm:static sm:inset-auto flex flex-col overflow-hidden rounded-t-[1.25rem] sm:rounded-2xl border border-surface-variant/80 bg-surface-container-lowest w-full sm:w-[min(100vw-1.5rem,420px)] h-[min(88dvh,640px)] sm:h-[min(76dvh,600px)]"
        >
          <header className="relative flex-shrink-0 overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-container px-4 py-3.5 sm:py-4 text-on-primary">
            <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-secondary-container/12 blur-2xl" />
            <div className="absolute -left-6 bottom-0 h-20 w-20 rounded-full bg-primary-fixed/10 blur-xl" />

            <div className="relative flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <CareAvatar />
                <div className="min-w-0">
                  <p className="font-label-md text-label-md truncate">Care Assistant</p>
                  <p className="font-body-sm text-body-sm text-primary-fixed/90 flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
                    Online · replies instantly
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl text-on-primary/85 hover:text-on-primary hover:bg-white/12 transition-colors"
                aria-label="Close chat"
              >
                <CloseIcon />
              </button>
            </div>

            {isMobile && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/25" />
            )}
          </header>

          <div
            ref={messagesContainerRef}
            className="flex-1 min-h-0 overflow-y-auto chat-scrollbar px-3 py-3 sm:px-4 sm:py-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-surface-container-low via-surface-container-lowest to-surface-container-lowest"
          >
            {messages.map((message, index) => (
              <div key={message.id} className="space-y-2">
                <MessageBubble message={message} />
                {index === messages.length - 1 && activeChoices && (
                  <ChoiceButtons
                    choices={activeChoices}
                    onSelect={(choice) => void handleSend(choice)}
                    disabled={isTyping}
                  />
                )}
              </div>
            ))}
            {showQuickReplies && (
              <div className="chat-message-enter space-y-2 pl-10 sm:pl-12">
                <p className="font-label-sm text-label-sm text-on-surface-variant/80">
                  Quick questions
                </p>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply}
                      type="button"
                      onClick={() => void handleSend(reply)}
                      className={`${CHIP_CLASS} sm:max-w-[calc(50%-0.25rem)]`}
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} className="h-px" />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex-shrink-0 border-t border-surface-variant/60 bg-surface-container-lowest p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          >
            <div className="chat-input-shell flex items-end gap-2 rounded-2xl border border-surface-variant/80 bg-white px-3 py-2 shadow-sm">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Type your message..."
                disabled={isTyping}
                className="flex-1 resize-none bg-transparent font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none max-h-28 py-2 disabled:opacity-60 leading-snug"
                aria-label="Message"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex-shrink-0 w-11 h-11 rounded-xl bg-secondary-container text-primary flex items-center justify-center hover:bg-secondary-fixed-dim disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 shadow-sm"
                aria-label="Send message"
              >
                <SendIcon />
              </button>
            </div>
            <p className="mt-2 text-center font-body-sm text-body-sm text-on-surface-variant/60 hidden sm:block">
              Press Enter to send · Shift+Enter for a new line
            </p>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`chat-fab relative w-[3.75rem] h-[3.75rem] sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary to-primary-container text-secondary-container flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 ${isOpen ? 'chat-fab-open scale-95' : ''}`}
        aria-label={isOpen ? 'Close chat' : 'Open chat with care assistant'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <CloseIcon />
        ) : (
          <>
            <ChatIcon className="w-6 h-6" />
            {hasUnread && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-secondary-container border-2 border-primary animate-pulse" />
            )}
          </>
        )}
      </button>
    </div>
  )
}
