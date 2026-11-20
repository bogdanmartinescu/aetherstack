import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Button } from "@aetherstack/ui/button"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
      <Button>Installed from packed @aetherstack/ui</Button>
    </main>
  </StrictMode>,
)
