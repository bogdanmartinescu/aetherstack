import { describe, it, expect } from "vitest"
import {
  palette,
  semanticColors,
  spacing,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  fontFamilies,
  radius,
  baseRadius,
  shadows,
  durations,
  easings,
  transitions,
} from "../index"

describe("palette", () => {
  it("has all expected hue families", () => {
    expect(Object.keys(palette)).toEqual(
      expect.arrayContaining(["neutral", "violet", "blue", "green", "red", "amber"]),
    )
  })

  it("neutral scale has 0 through 950", () => {
    expect(palette.neutral[0]).toBe("0 0% 100%")
    expect(palette.neutral[950]).toBe("0 0% 4%")
  })

  it("all palette values are HSL strings without hsl() wrapper", () => {
    for (const family of Object.values(palette)) {
      for (const value of Object.values(family)) {
        expect(typeof value).toBe("string")
        expect(value).not.toMatch(/^hsl\(/)
      }
    }
  })
})

describe("semanticColors", () => {
  const requiredVars = [
    "--background",
    "--foreground",
    "--card",
    "--card-foreground",
    "--popover",
    "--popover-foreground",
    "--primary",
    "--primary-foreground",
    "--secondary",
    "--secondary-foreground",
    "--muted",
    "--muted-foreground",
    "--accent",
    "--accent-foreground",
    "--destructive",
    "--destructive-foreground",
    "--border",
    "--input",
    "--ring",
    "--sidebar-background",
    "--sidebar-foreground",
    "--sidebar-primary",
    "--sidebar-primary-foreground",
    "--sidebar-accent",
    "--sidebar-accent-foreground",
    "--sidebar-border",
    "--sidebar-ring",
  ] as const

  it("light mode defines all required CSS variables", () => {
    for (const varName of requiredVars) {
      expect(semanticColors.light).toHaveProperty(varName)
    }
  })

  it("dark mode defines all required CSS variables", () => {
    for (const varName of requiredVars) {
      expect(semanticColors.dark).toHaveProperty(varName)
    }
  })

  it("all values are non-empty strings", () => {
    for (const value of Object.values(semanticColors.light)) {
      expect(typeof value).toBe("string")
      expect(value.length).toBeGreaterThan(0)
    }
    for (const value of Object.values(semanticColors.dark)) {
      expect(typeof value).toBe("string")
      expect(value.length).toBeGreaterThan(0)
    }
  })

  it("light and dark mode have the same set of variables", () => {
    const lightKeys = Object.keys(semanticColors.light).sort()
    const darkKeys = Object.keys(semanticColors.dark).sort()
    expect(lightKeys).toEqual(darkKeys)
  })
})

describe("spacing", () => {
  it("has px entry", () => {
    expect(spacing.px).toBe("1px")
  })

  it("all values are CSS strings", () => {
    for (const value of Object.values(spacing)) {
      expect(typeof value).toBe("string")
    }
  })
})

describe("fontSizes", () => {
  it("has base size", () => {
    expect(fontSizes.base[0]).toBe("1rem")
  })

  it("all entries are [size, lineHeight] tuples", () => {
    for (const [size, meta] of Object.values(fontSizes)) {
      expect(typeof size).toBe("string")
      expect(meta).toHaveProperty("lineHeight")
    }
  })
})

describe("fontWeights", () => {
  it("has normal weight as 400", () => {
    expect(fontWeights.normal).toBe("400")
  })
})

describe("letterSpacings", () => {
  it("has normal as 0em", () => {
    expect(letterSpacings.normal).toBe("0em")
  })

  it("all values are em strings", () => {
    for (const value of Object.values(letterSpacings)) {
      expect(value).toMatch(/em$/)
    }
  })
})

describe("lineHeights", () => {
  it("has normal as 1.5", () => {
    expect(lineHeights.normal).toBe("1.5")
  })

  it("all values are numeric strings", () => {
    for (const value of Object.values(lineHeights)) {
      expect(Number.isNaN(Number(value))).toBe(false)
    }
  })
})

describe("fontFamilies", () => {
  it("has sans and mono entries", () => {
    expect(Object.keys(fontFamilies)).toEqual(expect.arrayContaining(["sans", "mono"]))
  })

  it("all values are CSS variable references", () => {
    for (const value of Object.values(fontFamilies)) {
      expect(value).toMatch(/^var\(--font-/)
    }
  })
})

describe("radius", () => {
  it("none is 0px", () => {
    expect(radius.none).toBe("0px")
  })

  it("full is a large pill value", () => {
    expect(radius.full).toBe("9999px")
  })

  it("baseRadius is a rem value", () => {
    expect(baseRadius).toMatch(/rem$/)
  })
})

describe("shadows", () => {
  it("none is 'none'", () => {
    expect(shadows.none).toBe("none")
  })

  it("all shadow values are strings", () => {
    for (const value of Object.values(shadows)) {
      expect(typeof value).toBe("string")
    }
  })
})

describe("motion", () => {
  it("durations are in ms", () => {
    for (const [key, value] of Object.entries(durations)) {
      if (key !== "instant") {
        expect(value).toMatch(/ms$/)
      }
    }
    expect(durations.instant).toBe("0ms")
  })

  it("easings are valid CSS strings", () => {
    for (const value of Object.values(easings)) {
      expect(typeof value).toBe("string")
      expect(value.length).toBeGreaterThan(0)
    }
  })

  it("transitions reference valid durations and easings", () => {
    expect(transitions.colors).toContain(durations.normal)
    expect(transitions.colors).toContain(easings.inOut)
  })
})
