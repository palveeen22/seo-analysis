'use client'

import { type FormEvent, useState } from 'react'
import { Button, Input, Tabs, TabsList, TabsTrigger, TabsContent, Badge } from '@/shared/ui'
import { Loader2, Sparkles, Link2, MessageSquare, XCircle, Lightbulb, ChevronRight } from 'lucide-react'
import { cn } from '@/shared/lib'
import { PROMPT_EXAMPLES } from '@/entities/generate'

interface GenerateFormProps {
  isPending?: boolean
  onSubmit: (input: { url?: string; prompt?: string }) => void
  errorMessage?: string
}

export function GenerateForm({ isPending, onSubmit, errorMessage }: GenerateFormProps) {
  const [url, setUrl] = useState('')
  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState<'url' | 'prompt'>('url')
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(true)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (mode === 'url') {
      if (!url.trim()) return
      let normalizedUrl = url.trim()
      if (!/^https?:\/\//.test(normalizedUrl)) {
        normalizedUrl = `https://${normalizedUrl}`
      }
      onSubmit({ url: normalizedUrl })
    } else {
      if (!prompt.trim()) return
      onSubmit({ prompt: prompt.trim() })
    }
  }

  function handleSelectPrompt(selectedPrompt: string) {
    setPrompt(selectedPrompt)
    setShowSuggestions(false)
  }

  const promptSuggestions = []
  if (mode === 'prompt' && prompt.length > 0 && prompt.length < 30) {
    promptSuggestions.push('Add more details about your website\'s purpose')
  }
  if (mode === 'prompt' && prompt.length > 0 && !prompt.toLowerCase().includes('for')) {
    promptSuggestions.push('Mention your target audience (e.g., "for small businesses")')
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <form onSubmit={handleSubmit}>
        <Tabs value={mode} onValueChange={(v) => setMode(v as 'url' | 'prompt')}>
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="url" className="flex-1 gap-2">
              <Link2 className="size-4" />
              From URL
            </TabsTrigger>
            <TabsTrigger value="prompt" className="flex-1 gap-2">
              <MessageSquare className="size-4" />
              From Prompt
            </TabsTrigger>
          </TabsList>

          <TabsContent value="url" className="space-y-3">
            <div className="relative flex items-center">
              <div className="pointer-events-none absolute left-4 flex items-center">
                <Link2 className="size-4 text-muted-foreground" />
              </div>
              <Input
                type="url"
                placeholder="Enter URL to optimize (e.g. https://example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isPending}
                className={cn(
                  'h-12 pl-10 pr-36',
                  errorMessage && 'border-destructive focus-visible:ring-destructive'
                )}
                required={mode === 'url'}
              />
              <Button
                className="absolute right-2 h-8 gap-2 px-4"
                type="submit"
                disabled={isPending || !url.trim()}
              >
                {isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    Generate
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              AI will analyze the URL and generate optimized metadata based on the page content
            </p>
          </TabsContent>

          <TabsContent value="prompt" className="space-y-3">
            <div className="space-y-3">
              <textarea
                placeholder="Describe your website in detail... e.g., 'A project management SaaS for remote teams with real-time collaboration, task tracking, and integrations with Slack and Google Drive'"
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value)
                  if (e.target.value.length > 0) setShowSuggestions(false)
                }}
                onFocus={() => {
                  if (prompt.length === 0) setShowSuggestions(true)
                }}
                disabled={isPending}
                rows={4}
                className={cn(
                  'flex w-full rounded-md border border-input bg-background px-3 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
                  errorMessage && 'border-destructive focus-visible:ring-destructive'
                )}
              />

              {/* Smart Suggestions */}
              {promptSuggestions.length > 0 && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="size-4 text-amber-600 mt-0.5" />
                    <div className="flex-1 space-y-1">
                      <p className="text-xs font-medium text-amber-900">
                        Suggestions to improve your prompt:
                      </p>
                      <ul className="text-xs text-amber-700 space-y-1">
                        {promptSuggestions.map((suggestion, i) => (
                          <li key={i}>• {suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <Button
                className="w-full gap-2"
                type="submit"
                disabled={isPending || !prompt.trim()}
              >
                {isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    Generate with AI
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {errorMessage && (
          <p className="mt-2 flex items-center gap-2 text-sm text-destructive">
            <XCircle className="size-4" />
            {errorMessage}
          </p>
        )}
      </form>

      {/* Prompt Examples - Only show when in prompt mode and field is empty or suggestions visible */}
      {mode === 'prompt' && (prompt.length === 0 || showSuggestions) && (
        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Sparkles className="size-4 text-primary" />
              <span>Example Prompts</span>
            </div>
            {!showSuggestions && prompt.length === 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSuggestions(true)}
                className="text-xs"
              >
                Show examples
              </Button>
            )}
          </div>

          {showSuggestions && (
            <div className="space-y-2">
              {PROMPT_EXAMPLES.map((category) => (
                <div key={category.category} className="border rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setExpandedCategory(
                      expandedCategory === category.category ? null : category.category
                    )}
                    className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium text-sm">{category.category}</span>
                    </div>
                    <ChevronRight 
                      className={cn(
                        'size-4 transition-transform',
                        expandedCategory === category.category && 'rotate-90'
                      )}
                    />
                  </button>

                  {expandedCategory === category.category && (
                    <div className="px-3 pb-3 space-y-2 bg-muted/20">
                      {category.prompts.map((examplePrompt, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSelectPrompt(examplePrompt)}
                          className="w-full text-left p-2 text-xs rounded hover:bg-primary/10 transition-colors border border-transparent hover:border-primary/20 text-muted-foreground hover:text-foreground"
                        >
                          {examplePrompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}