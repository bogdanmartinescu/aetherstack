/**
 * Picks a syntax-highlighting language for a docs code block.
 *
 * Most docs snippets only pass a `filename` ("terminal", "button.tsx",
 * "css (add to top)"), so the language is read from that first and only then
 * guessed from the code itself. Returning `undefined` renders plain text.
 */
export function inferCodeLanguage(
  code: string,
  language?: string,
  filename?: string,
): string | undefined {
  if (language) return language

  if (filename) {
    const label = filename.trim().toLowerCase()
    if (label === "terminal") return "bash"
    const extension = /\.([a-z0-9]+)(?:\s|$)/.exec(label)?.[1]
    if (extension) return extension
    // Labels such as "css (add to top)" or "json" lead with the language.
    const firstWord = /^([a-z]+)(?:\s|$)/.exec(label)?.[1]
    if (firstWord && /^(?:css|json|js|ts|tsx|jsx|bash|html)$/.test(firstWord)) return firstWord
    return undefined
  }

  const source = code.trim()
  if (/^[{[]/.test(source)) return "json"
  if (/^(?:\$\s|npx |pnpm |npm |yarn |git |cd )/.test(source)) return "bash"
  if (/\b(?:import|export|const|function|return)\b/.test(source)) return "tsx"
  return undefined
}
