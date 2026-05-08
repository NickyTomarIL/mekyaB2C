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


def is_under_icons_dir(file_path: str, icons_dir: Path) -> bool:
    if not file_path:
        return False
    try:
        resolved = Path(file_path).resolve()
        resolved_icons = icons_dir.resolve()
        return resolved == resolved_icons or resolved_icons in resolved.parents
    except (OSError, ValueError):
        normalized = file_path.replace("\\", "/")
        return "/src/assets/icons/" in normalized


def main() -> int:
    raw_payload = sys.stdin.read()
    repo_root = Path(__file__).resolve().parents[2]
    icons_dir = repo_root / "src" / "assets" / "icons"
    index_file = icons_dir / "index.ts"

    file_path = ""
    if raw_payload.strip():
        try:
            payload = json.loads(raw_payload)
            file_path = payload.get("file_path") or ""
        except json.JSONDecodeError:
            print("{}")
            return 0

    # Cursor afterFileEdit: only react when the edit is under icons (or stdin empty = CLI).
    if file_path and not is_under_icons_dir(file_path, icons_dir):
        print("{}")
        return 0

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
