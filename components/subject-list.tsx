"use client"

import type { Subject } from "@/app/page"
import { BookOpen } from "lucide-react"

type Props = {
  subjects: Subject[]
  onSelect: (subject: Subject) => void
}

export function SubjectList({ subjects, onSelect }: Props) {
  return (
    <div className="px-4 pt-12 pb-6">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Mis Asignaturas</h1>
        <p className="text-muted-foreground text-sm">Selecciona una asignatura para estudiar</p>
      </div>

      <div className="space-y-3">
        {subjects.map((subject) => (
          <button key={subject.id} onClick={() => onSelect(subject)} className="w-full group">
            <div className="relative overflow-hidden rounded-xl bg-card border border-border p-4 transition-all duration-300 active:scale-[0.98] hover:border-primary/50">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${subject.color} opacity-0 group-hover:opacity-5 transition-opacity`}
              />
              <div className="relative flex items-center gap-4">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${subject.color} text-2xl`}
                >
                  {subject.icon}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-foreground text-base">{subject.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Teoría y Tests disponibles</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors"
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
        ))}
      </div>
    </div>
  )
}
