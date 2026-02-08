import { Coffee, Code, Heart, Lock } from 'lucide-react'
import { Separator } from '@/shared/ui'

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Info badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Code className="size-4" />
              <span>Free & Open Source</span>
            </div>
            <Separator orientation="vertical" className="hidden h-4 sm:block" />
            <div className="flex items-center gap-2">
              <Lock className="size-4" />
              <span>No Sign Up Required</span>
            </div>
          </div>

          {/* Buy me a coffee */}
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Coffee className="size-4" />
            Buy me a coffee
          </a>

          <Separator className="max-w-xs" />

          {/* Copyright */}
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            Alvin - Made with Caffein <Coffee className="size-3 fill-current" />
          </p>
        </div>
      </div>
    </footer>
  )
}
