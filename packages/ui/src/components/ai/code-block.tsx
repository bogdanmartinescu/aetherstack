"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@aetherstack/utils"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  /** 1-based line numbers to emphasise, e.g. `[2, 3]`. */
  highlightLines?: readonly number[]
  className?: string
}

type CodeTokenType =
  | "plain"
  | "keyword"
  | "string"
  | "number"
  | "comment"
  | "function"
  | "type"
  | "property"
  | "punctuation"
  | "tag"

interface CodeToken {
  type: CodeTokenType
  text: string
}

type CodeLanguage = "script" | "json" | "shell" | "css"

const LANGUAGE_ALIASES: Readonly<Record<string, CodeLanguage>> = {
  js: "script",
  jsx: "script",
  mjs: "script",
  cjs: "script",
  ts: "script",
  tsx: "script",
  mts: "script",
  cts: "script",
  javascript: "script",
  typescript: "script",
  html: "script",
  astro: "script",
  vue: "script",
  svelte: "script",
  json: "json",
  jsonc: "json",
  json5: "json",
  bash: "shell",
  sh: "shell",
  shell: "shell",
  zsh: "shell",
  terminal: "shell",
  console: "shell",
  css: "css",
  scss: "css",
}

const SCRIPT_KEYWORDS = new Set([
  "as",
  "async",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "from",
  "function",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "keyof",
  "let",
  "new",
  "null",
  "of",
  "readonly",
  "return",
  "satisfies",
  "static",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "type",
  "typeof",
  "undefined",
  "var",
  "void",
  "while",
  "yield",
])

const SCRIPT_BUILTIN_TYPES = new Set([
  "any",
  "boolean",
  "never",
  "number",
  "object",
  "string",
  "unknown",
])

const SHELL_KEYWORDS = new Set([
  "case",
  "do",
  "done",
  "elif",
  "else",
  "esac",
  "fi",
  "for",
  "if",
  "in",
  "then",
  "while",
])

interface ScanState {
  /** Last significant (non-whitespace, non-comment) character emitted. */
  prev: string
  /** The previous token when it was a bare word, otherwise an empty string. */
  prevWord: string
  /** True while only whitespace has been seen on the current line. */
  lineStart: boolean
  /** Open JSX tags; each entry is the `{}` depth inside that tag's attributes. */
  tags: number[]
  /** Inside JSX children text, where words are not code. */
  jsxText: boolean
  /** The next identifier is a JSX tag name. */
  tagName: boolean
  /** CSS block depth. */
  depth: number
  /** The next shell word is a command. */
  command: boolean
}

interface ScanMatch {
  type: CodeTokenType
  text: string
}

type ScanRule = (code: string, index: number, state: ScanState) => ScanMatch | null

function stickyRule(pattern: RegExp, type: CodeTokenType): ScanRule {
  const re = new RegExp(pattern.source, "y")
  return (code, index) => {
    re.lastIndex = index
    const match = re.exec(code)
    return match ? { type, text: match[0] } : null
  }
}

function followedBy(code: string, index: number, pattern: RegExp) {
  const re = new RegExp(pattern.source, "y")
  re.lastIndex = index
  return re.test(code)
}

const STRING_PATTERN = /"(?:[^"\\\n]|\\.)*"?|'(?:[^'\\\n]|\\.)*'?|`(?:[^`\\]|\\[\s\S])*`?/
const WHITESPACE_RULE = stickyRule(/\s+/, "plain")

const scriptRules: ScanRule[] = [
  WHITESPACE_RULE,
  stickyRule(/\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$)/, "comment"),
  stickyRule(STRING_PATTERN, "string"),
  stickyRule(/0[xX][\da-fA-F_]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?/, "number"),
  // JSX / HTML tag opener. `a < b` and `Promise<void>` are rejected by looking
  // at the previous significant character.
  (code, index, state) => {
    if (code[index] !== "<") return null
    const closing = code[index + 1] === "/"
    const nameStart = code[index + (closing ? 2 : 1)] ?? ""
    if (!/[A-Za-z]/.test(nameStart)) return null
    if (!closing && /[\w$)\]]/.test(state.prev) && state.prevWord !== "return") return null
    state.tags.push(0)
    state.tagName = true
    state.jsxText = false
    return { type: "punctuation", text: closing ? "</" : "<" }
  },
  // Tag name, attribute name, or ordinary identifier.
  (code, index, state) => {
    const re = state.tagName
      ? /[A-Za-z_$][\w$.-]*/y
      : state.tags.length > 0
        ? /[A-Za-z_$][\w$-]*/y
        : /[A-Za-z_$][\w$]*/y
    re.lastIndex = index
    const match = re.exec(code)
    if (!match) return null
    const text = match[0]
    const end = index + text.length
    if (state.tagName) {
      state.tagName = false
      return { type: /^[A-Z]/.test(text) || text.includes(".") ? "type" : "tag", text }
    }
    const top = state.tags[state.tags.length - 1]
    if (top === 0) return { type: "property", text }
    if (state.jsxText) return { type: "plain", text }
    const isCall = followedBy(code, end, /\s*\(/)
    if (state.prev === ".") return { type: isCall ? "function" : "plain", text }
    if (SCRIPT_KEYWORDS.has(text)) return { type: "keyword", text }
    if (isCall) return { type: "function", text }
    if (SCRIPT_BUILTIN_TYPES.has(text)) return { type: "type", text }
    if (/^[A-Z][A-Z0-9_]+$/.test(text)) return { type: "plain", text }
    if (/^[A-Z]/.test(text)) return { type: "type", text }
    const startsEntry = state.lineStart || /[{,;(]/.test(state.prev)
    if (startsEntry && followedBy(code, end, /\s*\??\s*:(?!:)/)) return { type: "property", text }
    return { type: "plain", text }
  },
  stickyRule(/=>|\.\.\./, "punctuation"),
  (code, index, state) => {
    const char = code[index] ?? ""
    const last = state.tags.length - 1
    state.jsxText = false
    if (last >= 0) {
      const top = state.tags[last] ?? 0
      if (char === "{") state.tags[last] = top + 1
      else if (char === "}" && top > 0) state.tags[last] = top - 1
      else if (top === 0 && char === ">") {
        state.tags.pop()
        state.jsxText = true
      } else if (top === 0 && char === "/" && code[index + 1] === ">") {
        state.tags.pop()
        return { type: "punctuation", text: "/>" }
      } else if (top === 0 && char === ";") state.tags.length = 0
    }
    return /[{}()[\];,.<>=+\-*/%&|^!?:~@#]/.test(char) ? { type: "punctuation", text: char } : null
  },
]

const jsonRules: ScanRule[] = [
  WHITESPACE_RULE,
  stickyRule(/\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$)/, "comment"),
  (code, index) => {
    const re = new RegExp(STRING_PATTERN.source, "y")
    re.lastIndex = index
    const match = re.exec(code)
    if (!match) return null
    const isKey = followedBy(code, index + match[0].length, /\s*:/)
    return { type: isKey ? "property" : "string", text: match[0] }
  },
  stickyRule(/-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/, "number"),
  stickyRule(/\b(?:true|false|null)\b/, "keyword"),
  stickyRule(/[{}[\],:]/, "punctuation"),
]

const shellRules: ScanRule[] = [
  (code, index, state) => {
    const match = /^\s+/.exec(code.slice(index))
    if (!match) return null
    if (match[0].includes("\n") && state.prev !== "\\") state.command = true
    return { type: "plain", text: match[0] }
  },
  (code, index) => {
    if (code[index] !== "#") return null
    const before = code[index - 1]
    if (before !== undefined && !/\s/.test(before)) return null
    const end = code.indexOf("\n", index)
    return { type: "comment", text: code.slice(index, end === -1 ? code.length : end) }
  },
  stickyRule(/"(?:[^"\\]|\\[\s\S])*"?|'[^']*'?/, "string"),
  stickyRule(/\$(?:\{[^}]*\}|[A-Za-z_]\w*|\d)/, "type"),
  (code, index, state) => {
    const re = /&&|\|\||[|;&<>]/y
    re.lastIndex = index
    const match = re.exec(code)
    if (!match) return null
    if (/[|;&]/.test(match[0])) state.command = true
    return { type: "punctuation", text: match[0] }
  },
  (code, index, state) => {
    const before = code[index - 1]
    if (before === undefined || /\s/.test(before)) {
      const flag = /--?[A-Za-z][\w-]*/y
      flag.lastIndex = index
      const match = flag.exec(code)
      if (match) return { type: "property", text: match[0] }
    }
    const re = /[^\s"'$|;&<>]+/y
    re.lastIndex = index
    const match = re.exec(code)
    if (!match) return null
    const text = match[0]
    if (text === "\\") return { type: "punctuation", text }
    if (state.command && text !== "$" && !text.includes("=")) {
      state.command = false
      return { type: SHELL_KEYWORDS.has(text) ? "keyword" : "function", text }
    }
    return { type: SHELL_KEYWORDS.has(text) ? "keyword" : "plain", text }
  },
  stickyRule(/[\s\S]/, "plain"),
]

const cssRules: ScanRule[] = [
  WHITESPACE_RULE,
  stickyRule(/\/\*[\s\S]*?(?:\*\/|$)/, "comment"),
  stickyRule(STRING_PATTERN, "string"),
  stickyRule(/@[\w-]+/, "keyword"),
  stickyRule(/#[\da-fA-F]{3,8}\b/, "number"),
  (code, index, state) => {
    const char = code[index] ?? ""
    if (char === "{") state.depth += 1
    if (char === "}") state.depth = Math.max(0, state.depth - 1)
    if (state.depth === 0 && /[.#]/.test(char)) {
      const re = /[.#][\w-]+/y
      re.lastIndex = index
      const match = re.exec(code)
      if (match) return { type: "type", text: match[0] }
    }
    return /[{}()[\];,.:>+~*=#]/.test(char) ? { type: "punctuation", text: char } : null
  },
  (code, index, state) => {
    const re = /-{0,2}[A-Za-z_][\w-]*/y
    re.lastIndex = index
    const match = re.exec(code)
    if (!match) return null
    const text = match[0]
    const end = index + text.length
    if (followedBy(code, end, /\(/)) return { type: "function", text }
    if (state.depth > 0 && followedBy(code, end, /\s*:/)) return { type: "property", text }
    if (state.depth === 0) return { type: "type", text }
    return { type: "plain", text }
  },
  stickyRule(/-?(?:\d+\.?\d*|\.\d+)(?:[a-zA-Z%]+)?/, "number"),
  stickyRule(/[\s\S]/, "plain"),
]

const RULES_BY_LANGUAGE: Readonly<Record<CodeLanguage, readonly ScanRule[]>> = {
  script: scriptRules,
  json: jsonRules,
  shell: shellRules,
  css: cssRules,
}

function resolveLanguage(language: string | undefined): CodeLanguage | undefined {
  if (!language) return undefined
  return LANGUAGE_ALIASES[language.toLowerCase()]
}

/**
 * Splits `code` into coloured tokens. Unknown or missing languages return a
 * single plain token, so callers can always render the result.
 */
function highlightCode(code: string, language?: string): CodeToken[] {
  const resolved = resolveLanguage(language)
  if (!resolved) return [{ type: "plain", text: code }]

  const rules = RULES_BY_LANGUAGE[resolved]
  const state: ScanState = {
    prev: "",
    prevWord: "",
    jsxText: false,
    lineStart: true,
    tags: [],
    tagName: false,
    depth: 0,
    command: true,
  }
  const tokens: CodeToken[] = []

  const push = (type: CodeTokenType, text: string) => {
    const last = tokens[tokens.length - 1]
    if (last && last.type === type && type === "plain") last.text += text
    else tokens.push({ type, text })
  }

  let index = 0
  while (index < code.length) {
    let match: ScanMatch | null = null
    for (const rule of rules) {
      match = rule(code, index, state)
      if (match) break
    }
    // Every rule set can fall through (e.g. an unknown punctuation char).
    const { type, text } = match ?? { type: "plain" as const, text: code.charAt(index) }

    const isBlank = text.trim() === ""
    if (isBlank) {
      if (text.includes("\n")) {
        state.lineStart = true
        state.jsxText = false
      }
    } else {
      state.lineStart = false
      if (type !== "comment") {
        state.prev = text.slice(-1)
        state.prevWord = /^[A-Za-z_$][\w$]*$/.test(text) ? text : ""
      }
    }
    push(type, text)
    index += text.length
  }
  return tokens
}

/** Splits tokens on newlines so each returned array is one rendered line. */
function splitTokensByLine(tokens: readonly CodeToken[]): CodeToken[][] {
  const lines: CodeToken[][] = [[]]
  for (const token of tokens) {
    const parts = token.text.split("\n")
    parts.forEach((part, i) => {
      if (i > 0) lines.push([])
      if (part) lines[lines.length - 1]?.push({ type: token.type, text: part })
    })
  }
  return lines
}

// Colours come from `--code-*` HSL channel variables so a theme can retune them;
// the fallbacks are the default Aether palette (checked for WCAG AA contrast on
// `bg-muted` in light and dark).
const TOKEN_CLASS_NAMES: Readonly<Record<Exclude<CodeTokenType, "plain">, string>> = {
  keyword:
    "text-[hsl(var(--code-keyword,268_70%_42%))] dark:text-[hsl(var(--code-keyword,267_90%_78%))]",
  tag: "text-[hsl(var(--code-tag,268_70%_42%))] dark:text-[hsl(var(--code-tag,267_90%_78%))]",
  string:
    "text-[hsl(var(--code-string,152_65%_24%))] dark:text-[hsl(var(--code-string,142_55%_65%))]",
  number:
    "text-[hsl(var(--code-number,24_90%_34%))] dark:text-[hsl(var(--code-number,28_90%_68%))]",
  function:
    "text-[hsl(var(--code-function,221_75%_40%))] dark:text-[hsl(var(--code-function,212_90%_72%))]",
  type: "text-[hsl(var(--code-type,190_85%_26%))] dark:text-[hsl(var(--code-type,186_65%_62%))]",
  property:
    "text-[hsl(var(--code-property,330_70%_38%))] dark:text-[hsl(var(--code-property,322_75%_76%))]",
  punctuation:
    "text-[hsl(var(--code-punctuation,0_0%_36%))] dark:text-[hsl(var(--code-punctuation,0_0%_66%))]",
  comment:
    "italic text-[hsl(var(--code-comment,0_0%_38%))] dark:text-[hsl(var(--code-comment,0_0%_63%))]",
}

function renderTokens(tokens: readonly CodeToken[]): React.ReactNode {
  return tokens.map((token, i) =>
    token.type === "plain" ? (
      token.text
    ) : (
      <span key={i} data-token={token.type} className={TOKEN_CLASS_NAMES[token.type]}>
        {token.text}
      </span>
    ),
  )
}

/** Renders `code` as highlighted spans; place it inside a `<code>` element. */
function HighlightedCode({ code, language }: { code: string; language?: string }) {
  const tokens = React.useMemo(() => highlightCode(code, language), [code, language])
  return <>{renderTokens(tokens)}</>
}

const COPIED_RESET_MS = 2000

function useCopyToClipboard() {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    },
    [],
  )

  const copy = React.useCallback((text: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setCopied(false), COPIED_RESET_MS)
      },
      () => setCopied(false),
    )
  }, [])

  return { copied, copy }
}

const copyButtonClassName = cn(
  "flex items-center gap-1 rounded text-xs text-muted-foreground transition-colors hover:text-foreground",
  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
)

function CodeBlock({
  code,
  language,
  filename,
  showLineNumbers = false,
  highlightLines,
  className,
}: CodeBlockProps) {
  const { copied, copy } = useCopyToClipboard()
  const hasHeader = Boolean(filename ?? language)
  const renderLines = showLineNumbers || (highlightLines !== undefined && highlightLines.length > 0)
  const highlighted = React.useMemo(() => new Set(highlightLines), [highlightLines])

  // A trailing newline would otherwise render as an empty, numbered last line.
  const trimmed = code.replace(/\n$/, "")
  const lines = React.useMemo(
    () => (renderLines ? splitTokensByLine(highlightCode(trimmed, language)) : []),
    [renderLines, trimmed, language],
  )
  const copyIcon = copied ? (
    <Check className="h-3.5 w-3.5" aria-hidden="true" />
  ) : (
    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
  )

  return (
    <div
      className={cn(
        "border-border bg-muted group relative overflow-hidden rounded-lg border",
        className,
      )}
    >
      {hasHeader && (
        <div className="border-border bg-card flex items-center justify-between gap-2 border-b px-4 py-2">
          <div className="flex min-w-0 items-center gap-2">
            {filename && (
              <span className="text-muted-foreground truncate font-mono text-sm">{filename}</span>
            )}
            {language && !filename && (
              <span className="text-muted-foreground text-xs uppercase tracking-wide">
                {language}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => copy(code)}
            className={cn(copyButtonClassName, "shrink-0 px-1 py-0.5")}
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copyIcon}
            <span aria-hidden="true">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      )}
      <div className="relative">
        {!hasHeader && (
          <button
            type="button"
            onClick={() => copy(code)}
            className={cn(
              copyButtonClassName,
              "bg-muted/80 absolute right-2 top-2 z-10 px-2 py-1 backdrop-blur-sm",
              "focus-visible:opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100",
              copied && "opacity-100",
            )}
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copyIcon}
          </button>
        )}
        <pre
          tabIndex={0}
          data-language={language}
          className="focus-visible:ring-ring overflow-x-auto p-4 font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset"
        >
          {renderLines ? (
            <code className="grid w-max min-w-full">
              {lines.map((line, i) => {
                const lineNumber = i + 1
                const isHighlighted = highlighted.has(lineNumber)
                return (
                  <span
                    key={i}
                    data-line={lineNumber}
                    data-highlighted={isHighlighted || undefined}
                    className={cn(
                      "-mx-4 flex px-4",
                      isHighlighted && "border-primary bg-primary/10 border-l-2 pl-[14px]",
                    )}
                  >
                    {showLineNumbers && (
                      <span
                        aria-hidden="true"
                        className="text-muted-foreground mr-4 w-8 shrink-0 select-none text-right"
                      >
                        {lineNumber}
                      </span>
                    )}
                    <span>{line.length > 0 ? renderTokens(line) : " "}</span>
                  </span>
                )
              })}
            </code>
          ) : (
            <code>
              <HighlightedCode code={code} language={language} />
            </code>
          )}
        </pre>
      </div>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  )
}

export { CodeBlock, HighlightedCode, highlightCode }
export type { CodeBlockProps, CodeToken, CodeTokenType }
