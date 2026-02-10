import { useEffect, useRef, useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import knowledgeBase from '../data/srilankaGovKnowledge.json';

const SYSTEM_INSTRUCTION =
  'You are a helpful assistant for the CiviResolve app. Answer questions about Sri Lanka government services, procedures, and public-sector topics. If you are unsure, say you do not know and suggest contacting the relevant government office.';

const MODEL = 'gemini-3-flash-preview';

// ── Local knowledge-base search ──────────────────────────────────
function searchLocal(query) {
  const words = query
    .toLowerCase()
    .replace(/[^a-z0-9\s/]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 1);

  if (words.length === 0) return null;

  let bestMatch = null;
  let bestScore = 0;

  for (const section of knowledgeBase) {
    let sectionScore = 0;
    for (const word of words) {
      for (const kw of section.keywords) {
        if (kw.includes(word) || word.includes(kw)) {
          sectionScore += 2;
        }
      }
    }

    if (sectionScore === 0) continue;

    for (const item of section.qa) {
      let qaScore = sectionScore;
      const qLower = item.q.toLowerCase();
      const aLower = item.a.toLowerCase();

      for (const word of words) {
        if (qLower.includes(word)) qaScore += 3;
        if (aLower.includes(word)) qaScore += 1;
      }

      if (qaScore > bestScore) {
        bestScore = qaScore;
        bestMatch = item;
      }
    }
  }

  return bestScore >= 4 ? bestMatch : null;
}

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hi! I can help with Sri Lanka government services, documents, and procedures. What do you need?',
    },
  ]);
  const [chat, setChat] = useState(null);
  const scrollRef = useRef(null);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // Initialize the SDK chat session once
  useEffect(() => {
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const chatSession = ai.chats.create({
          model: MODEL,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.3,
            maxOutputTokens: 512,
          },
        });
        setChat(chatSession);
      } catch {
        setChat(null);
      }
    }
  }, [apiKey]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
    setInput('');
    setIsLoading(true);

    // ── 1. Try Gemini API first (normal chatbot) ───────────────
    if (chat) {
      try {
        const response = await chat.sendMessage({ message: trimmed });
        const text = response.text || 'Sorry, I could not generate a response.';
        setMessages((prev) => [...prev, { role: 'assistant', content: text }]);
        setIsLoading(false);
        return;
      } catch {
        // Gemini failed — fall through to local search
      }
    }

    // ── 2. Fallback: search local knowledge base ───────────────
    const localResult = searchLocal(trimmed);
    if (localResult) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: localResult.a },
      ]);
      setIsLoading(false);
      return;
    }

    // ── 3. Nothing worked — show available topics ──────────────
    const topics = knowledgeBase.map((s) => s.category).join(', ');
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: `I couldn't find a specific answer for that. Try asking about one of these topics: ${topics}. You can also call 1919 (Government Information Center) for help.`,
      },
    ]);
    setIsLoading(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-[90vw] max-w-sm rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between rounded-t-2xl border-b border-slate-200 bg-slate-900 px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">CiviResolve AI</p>
              <p className="text-xs text-slate-300">Sri Lanka government info</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-slate-200 hover:text-white"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="max-h-96 overflow-y-auto px-4 py-3">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`mb-3 flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm shadow-sm ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-900'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-3 flex justify-start">
                <div className="rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-500">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 p-3">
            <textarea
              rows={2}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about government services in Sri Lanka"
              className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={isLoading}
              className="mt-2 w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-700"
        aria-label="Open chat"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        </svg>
      </button>
    </div>
  );
}

export default ChatBot;
