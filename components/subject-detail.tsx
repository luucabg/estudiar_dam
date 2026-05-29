"use client"

import type { Subject } from "@/app/page"
import { ArrowLeft, BookText, ClipboardList } from "lucide-react"

type Props = {
  subject: Subject
  onBack: () => void
  onSelectMode: (mode: "theory" | "test") => void
}

export function SubjectDetail({ subject, onBack, onSelectMode }: Props) {
  return (
    <div className="px-4 pt-6 pb-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Volver</span>
      </button>

      <div className="text-center mb-10">
        <div
          className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${subject.color} text-4xl mb-4 shadow-lg`}
        >
          {subject.icon}
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">{subject.name}</h1>
        <p className="text-muted-foreground text-sm">Elige cómo quieres estudiar</p>
      </div>

      <div className="space-y-4">
        <button onClick={() => onSelectMode("theory")} className="w-full group">
          <div className="relative overflow-hidden rounded-xl bg-card border border-border p-6 transition-all duration-300 active:scale-[0.98] hover:border-primary/50">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary">
                <BookText className="w-7 h-7" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-foreground text-lg">Teoría</h3>
                <p className="text-sm text-muted-foreground mt-1">Aprende los conceptos fundamentales</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </button>

        <button onClick={() => onSelectMode("test")} className="w-full group">
          <div className="relative overflow-hidden rounded-xl bg-card border border-border p-6 transition-all duration-300 active:scale-[0.98] hover:border-primary/50">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 text-accent">
                <ClipboardList className="w-7 h-7" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-foreground text-lg">Test</h3>
                <p className="text-sm text-muted-foreground mt-1">Pon a prueba tus conocimientos</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
