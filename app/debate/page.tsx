"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function DebatePage() {
  const router = useRouter()
  const [heartValue, setHeartValue] = useState([75])
  const [logicValue, setLogicValue] = useState([75])
  const [shadowValue, setShadowValue] = useState([75])
  const [activePersona, setActivePersona] = useState<"Heart" | "Logic" | "Shadow">("Heart")
  const [showModal, setShowModal] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)

  // Blinking animation for avatar
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 3000)
    return () => clearInterval(blinkInterval)
  }, [])

  const personas = [
    {
      id: "Heart" as const,
      emoji: "❤️",
      label: "Heart",
      color: "#FF5A79",
      glowColor: "#FF5A79",
      value: heartValue,
      setValue: setHeartValue,
    },
    {
      id: "Logic" as const,
      emoji: "🧠",
      label: "Logic",
      color: "#9B6EFF",
      glowColor: "#9B6EFF",
      value: logicValue,
      setValue: setLogicValue,
    },
    {
      id: "Shadow" as const,
      emoji: "😈",
      label: "Shadow",
      color: "#A64AC9",
      glowColor: "#A64AC9",
      value: shadowValue,
      setValue: setShadowValue,
    },
  ]

  const dilemma = "Should I drop my Tuesday class?"

  return (
    <div className="min-h-screen bg-animated-deep font-sans relative overflow-hidden">
      {/* Header Section */}
      <header className="flex items-center justify-between p-6 animate-fade-in-animated">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-animated-text-dim hover:text-animated-text-main transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
        <h1 className="text-xl font-semibold text-animated-text-main absolute left-1/2 transform -translate-x-1/2">
          Internal Dialogue
        </h1>
        <div></div>
      </header>

      {/* Current Dilemma Section */}
      <div className="text-center mb-8 animate-fade-in-animated">
        <h2 className="text-2xl font-bold text-animated-text-main mb-6">Current Dilemma</h2>
        <div className="flex justify-center">
          <div className="bg-animated-dilemma-pill px-5 py-2.5 rounded-full">
            <span className="text-animated-text-main text-sm font-medium">{dilemma}</span>
          </div>
        </div>
      </div>

      {/* Persona Icons */}
      <div className="flex justify-center gap-4 mb-8 animate-fade-in-animated">
        {personas.map((persona, index) => (
          <div key={persona.id} className="text-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg mb-2 cursor-pointer transition-all duration-300 ${
                activePersona === persona.id
                  ? "scale-110 animate-pulse-active-animated"
                  : "scale-100 opacity-50 hover:opacity-80 hover:scale-105"
              }`}
              style={{
                backgroundColor: persona.color,
                boxShadow:
                  activePersona === persona.id
                    ? `0 0 25px ${persona.glowColor}80, 0 0 50px ${persona.glowColor}40`
                    : "0 4px 12px rgba(0, 0, 0, 0.3)",
              }}
              onClick={() => setActivePersona(persona.id)}
            >
              {persona.emoji}
            </div>
            <span
              className={`text-xs font-medium ${activePersona === persona.id ? "text-animated-text-main" : "text-animated-text-dim"}`}
            >
              {persona.label}
            </span>
          </div>
        ))}
      </div>

      {/* Speaking Avatar */}
      <div className="flex justify-center mb-8 animate-float-up-animated">
        <div
          className={`w-32 h-32 rounded-full bg-animated-avatar-bg border-2 flex items-center justify-center relative transition-all duration-500 ${
            isBlinking ? "animate-blink-animated" : ""
          }`}
          style={{
            borderColor: personas.find((p) => p.id === activePersona)?.color,
            boxShadow: `0 0 40px ${
              personas.find((p) => p.id === activePersona)?.glowColor
            }60, 0 8px 32px rgba(0, 0, 0, 0.4)`,
          }}
        >
          {/* Avatar Placeholder */}
          <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center">
            <span className="text-animated-text-dim text-xs">Avatar</span>
          </div>

          {/* Mouth Animation Indicator */}
          <div
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full animate-pulse-animated"
            style={{
              backgroundColor: personas.find((p) => p.id === activePersona)?.color,
              boxShadow: `0 0 15px ${personas.find((p) => p.id === activePersona)?.glowColor}80`,
            }}
          />
        </div>
      </div>

      {/* Persona Cards */}
      <div className="flex justify-center gap-8 mb-12 px-4">
        {personas.map((persona, index) => (
          <div
            key={persona.id}
            className={`w-72 h-96 rounded-3xl cursor-pointer transition-all duration-500 ${
              activePersona === persona.id
                ? "bg-animated-card-glass scale-105 animate-glow-speak-animated"
                : "bg-animated-card-glass opacity-60 hover:opacity-80 hover:scale-102"
            }`}
            style={{
              backdropFilter: "blur(12px)",
              border: activePersona === persona.id ? `2px solid ${persona.color}` : "1px solid rgba(255,255,255,0.1)",
              boxShadow:
                activePersona === persona.id
                  ? `0 0 30px ${persona.glowColor}40, inset 0 1px 0 rgba(255,255,255,0.1)`
                  : "inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
            onClick={() => setActivePersona(persona.id)}
          >
            <div className="w-full h-full flex items-center justify-center p-10">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: persona.color }}
              >
                {persona.emoji}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sliders Section */}
      <div className="max-w-lg mx-auto px-4 mb-8">
        <div className="space-y-4">
          {personas.map((persona) => (
            <div key={persona.id} className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                  activePersona === persona.id ? "scale-110 animate-pulse-animated" : "scale-100 opacity-70"
                }`}
                style={{
                  backgroundColor: persona.color,
                  boxShadow: activePersona === persona.id ? `0 0 20px ${persona.glowColor}60` : "none",
                }}
              >
                {persona.emoji}
              </div>
              <div className="flex-1">
                <Slider
                  value={persona.value}
                  onValueChange={(value) => {
                    persona.setValue(value)
                    setActivePersona(persona.id)
                  }}
                  max={100}
                  step={1}
                  className="slider-animated"
                />
              </div>
              <div className="min-w-[50px] text-right">
                <span className="text-animated-text-main font-mono text-lg font-semibold">{persona.value[0]}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Synthesize Wisdom Button */}
      <div className="flex justify-center pb-8">
        <Button
          onClick={() => setShowModal(true)}
          className="bg-gradient-animated-wisdom hover:opacity-90 text-white px-8 py-3.5 rounded-full text-sm font-bold transition-all duration-150 hover:scale-105 active:scale-97 shadow-xl border-0 animate-pulse-active-animated"
        >
          Synthesize Wisdom
        </Button>
      </div>

      {/* Animated Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in-animated">
          <div className="bg-animated-card-glass backdrop-blur-xl rounded-2xl w-full max-w-2xl mx-4 p-8 border border-white/10 shadow-animated-modal">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-animated-text-main">Synthesized Wisdom</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-animated-text-dim hover:text-animated-text-main transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="text-animated-text-main text-base leading-relaxed mb-6">
              <p>Here's the most balanced answer based on your internal debate:</p>
              <br />
              <p>
                After weighing your emotional instincts, logical analysis, and potential concerns, the recommendation
                considers both your immediate needs and long-term academic goals.
              </p>
            </div>

            {/* Persona Summary */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {personas.map((persona) => (
                <div key={persona.id} className="text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg mb-2 mx-auto"
                    style={{ backgroundColor: persona.color }}
                  >
                    {persona.emoji}
                  </div>
                  <span className="text-animated-text-main font-mono text-lg font-bold">{persona.value[0]}%</span>
                  <div className="text-animated-text-dim text-xs mt-1">{persona.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
