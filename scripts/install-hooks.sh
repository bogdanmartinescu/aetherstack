#!/usr/bin/env bash
# Installs the workspace git hooks into .git/hooks/.
# Run once after cloning: bash scripts/install-hooks.sh
set -e

HOOK_DIR="$(git rev-parse --show-toplevel)/.git/hooks"

install_hook() {
  local name="$1"
  local src="$(git rev-parse --show-toplevel)/scripts/hooks/$name"
  local dest="$HOOK_DIR/$name"
  cp "$src" "$dest"
  chmod +x "$dest"
  echo "  installed: $dest"
}

echo "Installing git hooks…"
install_hook pre-commit
echo "Done."
