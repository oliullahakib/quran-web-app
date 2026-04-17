import React from 'react'

interface TextHighlighterProps {
  text: string
  highlight: string
}

/**
 * Highlights a specific keyword within a string by wrapping it in a styled span.
 */
export default function TextHighlighter({ text, highlight }: TextHighlighterProps) {
  if (!highlight.trim()) {
    return <span>{text}</span>
  }

  const regex = new RegExp(`(${highlight})`, 'gi')
  const parts = text.split(regex)

  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-accent/20 text-accent font-bold px-0.5 rounded">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  )
}
