"use client"

import { useState } from "react"
import type { Subject } from "@/app/page"
import { ArrowLeft, ClipboardList, CheckCircle2, XCircle, RotateCcw } from "lucide-react"

type Props = {
  subject: Subject
  onBack: () => void
}

export function TestView({ subject, onBack }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const questions = subject.questions

  const handleSelectAnswer = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
  }

  const handleConfirm = () => {
    if (selectedAnswer === null) return

    setShowResult(true)
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setFinished(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setFinished(false)
  }

  if (questions.length === 0) {
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
              <ClipboardList className="w-4 h-4" />
              <span>Test</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Sin preguntas disponibles</h2>
          <p className="text-muted-foreground text-sm">Las preguntas del test serán añadidas próximamente.</p>
        </div>
      </div>
    )
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="px-4 pt-6 pb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Volver</span>
        </button>

        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
              percentage >= 70 ? "bg-primary/10" : "bg-destructive/10"
            }`}
          >
            {percentage >= 70 ? (
              <CheckCircle2 className="w-10 h-10 text-primary" />
            ) : (
              <XCircle className="w-10 h-10 text-destructive" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {percentage >= 70 ? "¡Buen trabajo!" : "Sigue practicando"}
          </h2>
          <p className="text-muted-foreground mb-6">
            Has acertado {score} de {questions.length} preguntas ({percentage}%)
          </p>
          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl transition-all active:scale-[0.98]"
          >
            <RotateCcw className="w-5 h-5" />
            Repetir Test
          </button>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="px-4 pt-6 pb-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Volver</span>
      </button>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${subject.color} text-xl`}
          >
            {subject.icon}
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">{subject.name}</h1>
            <div className="flex items-center gap-1.5 text-primary text-xs">
              <ClipboardList className="w-3 h-3" />
              <span>Test</span>
            </div>
          </div>
        </div>
        <div className="bg-secondary px-3 py-1.5 rounded-full">
          <span className="text-sm font-medium text-foreground">
            {currentQuestion + 1}/{questions.length}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5 mb-4">
        <p className="text-foreground font-medium leading-relaxed">{question.question}</p>
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          let borderColor = "border-border"
          let bgColor = "bg-card"

          if (showResult) {
            if (index === question.correctAnswer) {
              borderColor = "border-primary"
              bgColor = "bg-primary/10"
            } else if (index === selectedAnswer && index !== question.correctAnswer) {
              borderColor = "border-destructive"
              bgColor = "bg-destructive/10"
            }
          } else if (selectedAnswer === index) {
            borderColor = "border-primary"
            bgColor = "bg-primary/5"
          }

          return (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-xl border ${borderColor} ${bgColor} transition-all active:scale-[0.98] disabled:cursor-default`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    selectedAnswer === index
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-foreground text-sm">{option}</span>
              </div>
            </button>
          )
        })}
      </div>

      {!showResult ? (
        <button
          onClick={handleConfirm}
          disabled={selectedAnswer === null}
          className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirmar Respuesta
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl transition-all active:scale-[0.98]"
        >
          {currentQuestion < questions.length - 1 ? "Siguiente Pregunta" : "Ver Resultados"}
        </button>
      )}
    </div>
  )
}
