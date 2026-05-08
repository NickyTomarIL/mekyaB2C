#!/usr/bin/env python3

import json
import re
import sys
from pathlib import Path


def to_pascal_case(stem: str) -> str:
    tokens = re.findall(r"[A-Za-z0-9]+", stem.replace("-", " ").replace("_", " "))
    if not tokens:
        return "Icon"
    if len(tokens) == 1:
        token = tokens[0]
        return token[0].upper() + token[1:] if token else "Icon"
    return "".join(token[0].upper() + token[1:] if token else "" for token in tokens)


def build_index_content(svg_files: list[Path]) -> str:
    lines = []
    for svg_file in sorted(svg_files, key=lambda file: file.name.lower()):
        export_name = to_pascal_case(svg_file.stem)
        lines.append(f"export {{default as {export_name}}} from './{svg_file.name}';")
    return "\n".join(lines) + ("\n" if lines else "")


def main() -> int:
    # Read hook payload from stdin; this hook does not depend on its shape.
    raw_payload = sys.stdin.read()
    if raw_payload.strip():
        try:
            json.loads(raw_payload)
        except json.JSONDecodeError:
            # Ignore malformed payload and still attempt index sync.
            pass

    repo_root = Path(__file__).resolve().parents[2]
    icons_dir = repo_root / "src" / "assets" / "icons"
    index_file = icons_dir / "index.ts"

    if not icons_dir.exists():
        print("{}")
        return 0

    svg_files = [path for path in icons_dir.glob("*.svg") if path.is_file()]
    new_content = build_index_content(svg_files)
    current_content = index_file.read_text(encoding="utf-8") if index_file.exists() else ""

    if current_content != new_content:
        index_file.write_text(new_content, encoding="utf-8")

    print("{}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
