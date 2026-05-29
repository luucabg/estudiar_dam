"use client"

import type { Subject } from "@/app/page"
import { ArrowLeft, BookText } from "lucide-react"

type Props = {
  subject: Subject
  onBack: () => void
}

export function TheoryView({ subject, onBack }: Props) {
  return (
    <div className="px-4 pt-6 pb-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Volver</span>
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${subject.color} text-2xl`}
        >
          {subject.icon}
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">{subject.name}</h1>
          <div className="flex items-center gap-1.5 text-primary text-sm">
            <BookText className="w-4 h-4" />
            <span>Teoría</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {subject.theory.length > 0 ? (
          subject.theory.map((section, index) => {
            const items = section.content ?? section.items ?? []

            return (
              <div key={index} className="bg-card border border-border rounded-xl p-4">
                <h2 className="text-base font-semibold text-foreground mb-3 pb-2 border-b border-border">
                  {section.title}
                </h2>
                <ul className="space-y-2.5">
                  {items.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span className="text-primary mt-1 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })
        ) : (
          <div className="bg-card border border-border rounded-xl p-5 text-center">
            <p className="text-muted-foreground">Contenido de teoría pendiente...</p>
          </div>
        )}
      </div>
    </div>
  )
}
