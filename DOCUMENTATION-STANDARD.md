# 📝 DOCUMENTATION STANDARD

**Terra Ecosystem Documentation Guidelines**

---

## 🎯 PURPOSE

This standard ensures all Terra Ecosystem documentation is:

- **Consistent** — same structure across all repositories
- **Accessible** — understandable by developers, educators, and parents
- **Multilingual** — ready for translation into RU, UZ, DE and other languages
- **Child-Safe** — never contains content harmful to children

---

## 📁 REQUIRED FILES PER REPOSITORY

Every Terra Ecosystem repository **MUST** contain:

| File | Description | Priority |
|------|-------------|----------|
| README.md | Project overview, quick start | 🔴 Required |
| LICENSE.md | Terra Public License v1.0 | 🔴 Required |
| CITATION.cff | Academic citation metadata | 🔴 Required |
| CODE_OF_CONDUCT.md | Community behavior rules | 🔴 Required |
| CONTRIBUTING.md | How to contribute | 🔴 Required |
| SECURITY.md | Vulnerability reporting | 🔴 Required |
| CHANGELOG.md | Version history | 🟠 Recommended |
| GOVERNANCE.md | Decision-making structure | 🟠 Recommended |

---

## 📄 README.md STRUCTURE

```markdown
# Project Name
> One-line description

## 🎯 Overview
What this project does and why it exists.

## 🚀 Quick Start
Minimal steps to get running.

## 📚 Documentation
Links to full docs.

## 🤝 Contributing
Link to CONTRIBUTING.md

## 📜 License
License name + link to LICENSE.md

## 🔗 Part of FMP Ecosystem
Link to FMP-CENTRAL-REPO
```

---

## ✍️ WRITING STYLE

### Language

- **Primary:** English
- **Secondary:** Russian, Uzbek, German
- Use **simple, clear sentences** — max 20 words per sentence
- Avoid jargon without explanation
- Spell out acronyms on first use: FMP (Fractal Metascience Paradigm)

### Tone

- Professional but approachable
- Inclusive — no gendered language
- Respectful of all cultures and religions
- Child-safe — always

### Formatting

```
# H1 — Document title only (once per file)
## H2 — Major sections
### H3 — Subsections

**Bold** — for key terms, warnings
*Italic* — for titles, foreign words
Code — for commands, filenames, variables
> Blockquote — for important notes
```

---

## 🔢 VERSIONING STANDARD

All documents follow **Semantic Versioning** (MAJOR.MINOR.PATCH):

- **PATCH** — Typo fixes, clarifications
- **MINOR** — New sections, additions
- **MAJOR** — Breaking changes, restructuring

### Changelog Entry Format

```markdown
## [1.2.0] - 2026-01-15

### Added
- New section on AI ethics

### Changed
- Updated child safety requirements

### Fixed
- Typo in Section 3.2
```

---

## 🌍 MULTILINGUAL DOCUMENTATION

### Translation Structure

```
docs/
├── en/          # English (primary)
├── ru/          # Russian
├── uz/          # Uzbek
└── de/          # German
```

### Translation Rules

1. Translate **meaning**, not word-for-word
2. Preserve technical terms in English + local language
3. Keep emoji — they are universal
4. Mark machine-translated files with [MT] prefix until reviewed

---

## 🔗 LINKING STANDARD

**Internal links:**
```markdown
[Contributing Guide](./CONTRIBUTING.md)
```

**Cross-repository:**
```markdown
[FMP Central](https://github.com/Secret-Uzbek/FMP-CENTRAL-REPO)
[Terra Legal](https://github.com/AIUZ-Terra-Codex-EcoSystem/.terra-legal)
```

---

## 📊 CITATION.cff TEMPLATE

```yaml
cff-version: 1.2.0
message: "If you use this software, please cite it as below."
type: software
title: "Repository Title"
authors:
  - family-names: Abdukarimov
    given-names: Abdurashid
    orcid: "https://orcid.org/0009-0000-6394-4912"
    affiliation: "Fractal Metascience Foundation, Tashkent"
repository-code: "https://github.com/Secret-Uzbek/REPO-NAME"
license: CC-BY-4.0
date-released: "YYYY-MM-DD"
version: "1.0.0"
```

---

## ✅ DOCUMENTATION CHECKLIST

- [ ] All required files present
- [ ] README follows standard structure
- [ ] No broken internal links
- [ ] CITATION.cff is valid YAML
- [ ] No child-unsafe content
- [ ] Translations marked [MT] if machine-generated

---

*© 2025 Abdurashid Abdukarimov. Terra Ecosystem.*
*Version: 1.0.0 — March 2026*
