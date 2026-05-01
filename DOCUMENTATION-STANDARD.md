# рџ“ќ DOCUMENTATION STANDARD

**Terra Ecosystem Documentation Guidelines**

---

## рџЋЇ PURPOSE

This standard ensures all Terra Ecosystem documentation is:

- **Consistent** вЂ” same structure across all repositories
- **Accessible** вЂ” understandable by developers, educators, and parents
- **Multilingual** вЂ” ready for translation into RU, UZ, DE and other languages
- **Child-Safe** вЂ” never contains content harmful to children

---

## рџ“Ѓ REQUIRED FILES PER REPOSITORY

Every Terra Ecosystem repository **MUST** contain:

| File | Description | Priority |
|------|-------------|----------|
| README.md | Project overview, quick start | рџ”ґ Required |
| LICENSE.md | Terra Public License v1.0 | рџ”ґ Required |
| CITATION.cff | Academic citation metadata | рџ”ґ Required |
| CODE_OF_CONDUCT.md | Community behavior rules | рџ”ґ Required |
| CONTRIBUTING.md | How to contribute | рџ”ґ Required |
| SECURITY.md | Vulnerability reporting | рџ”ґ Required |
| CHANGELOG.md | Version history | рџџ  Recommended |
| GOVERNANCE.md | Decision-making structure | рџџ  Recommended |

---

## рџ“„ README.md STRUCTURE

```markdown
# Project Name
> One-line description

## рџЋЇ Overview
What this project does and why it exists.

## рџљЂ Quick Start
Minimal steps to get running.

## рџ“љ Documentation
Links to full docs.

## рџ¤ќ Contributing
Link to CONTRIBUTING.md

## рџ“њ License
License name + link to LICENSE.md

## рџ”— Part of FMP Ecosystem
Link to FMP-CENTRAL-REPO
```

---

## вњЌпёЏ WRITING STYLE

### Language

- **Primary:** English
- **Secondary:** Russian, Uzbek, German
- Use **simple, clear sentences** вЂ” max 20 words per sentence
- Avoid jargon without explanation
- Spell out acronyms on first use: FMP (Fractal Metascience Paradigm)

### Tone

- Professional but approachable
- Inclusive вЂ” no gendered language
- Respectful of all cultures and religions
- Child-safe вЂ” always

### Formatting

```
# H1 вЂ” Document title only (once per file)
## H2 вЂ” Major sections
### H3 вЂ” Subsections

**Bold** вЂ” for key terms, warnings
*Italic* вЂ” for titles, foreign words
Code вЂ” for commands, filenames, variables
> Blockquote вЂ” for important notes
```

---

## рџ”ў VERSIONING STANDARD

All documents follow **Semantic Versioning** (MAJOR.MINOR.PATCH):

- **PATCH** вЂ” Typo fixes, clarifications
- **MINOR** вЂ” New sections, additions
- **MAJOR** вЂ” Breaking changes, restructuring

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

## рџЊЌ MULTILINGUAL DOCUMENTATION

### Translation Structure

```
docs/
в”њв”Ђв”Ђ en/          # English (primary)
в”њв”Ђв”Ђ ru/          # Russian
в”њв”Ђв”Ђ uz/          # Uzbek
в””в”Ђв”Ђ de/          # German
```

### Translation Rules

1. Translate **meaning**, not word-for-word
2. Preserve technical terms in English + local language
3. Keep emoji вЂ” they are universal
4. Mark machine-translated files with [MT] prefix until reviewed

---

## рџ”— LINKING STANDARD

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

## рџ“Љ CITATION.cff TEMPLATE

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

## вњ… DOCUMENTATION CHECKLIST

- [ ] All required files present
- [ ] README follows standard structure
- [ ] No broken internal links
- [ ] CITATION.cff is valid YAML
- [ ] No child-unsafe content
- [ ] Translations marked [MT] if machine-generated

---

*В© 2025 Abdurashid Abdukarimov. Terra Ecosystem.*
*Version: 1.0.0 вЂ” March 2026*
