# 🔗 LINKING INSTRUCTIONS

**How to Connect Your Repository to Terra Legal Layer**

---

## 🎯 OVERVIEW

This guide explains how to link any repository in the Terra Ecosystem
to the .terra-legal governance framework.

By linking, your repository:
- Inherits Terra Public License v1.0
- Adopts Terra Code of Conduct
- Becomes part of the official Terra Ecosystem
- Gets listed in the Terra Registry

---

## 🚀 QUICK LINK (3 steps)

### Step 1 — Add .terra-legal reference to README

```markdown
[![Terra Legal](https://img.shields.io/badge/license-TPL--1.0-7c6aff)](https://github.com/AIUZ-Terra-Codex-EcoSystem/.terra-legal)
[![Child Safety First](https://img.shields.io/badge/child_safety-first-00d4aa)](https://github.com/AIUZ-Terra-Codex-EcoSystem/.terra-legal/blob/main/CODE_OF_CONDUCT.md)

## 📜 Legal & Governance

This project is governed by the [Terra Legal Framework](https://github.com/AIUZ-Terra-Codex-EcoSystem/.terra-legal):

- **License:** [Terra Public License v1.0](https://github.com/AIUZ-Terra-Codex-EcoSystem/.terra-legal/blob/main/LICENSE.md)
- **Code of Conduct:** [Terra Code of Conduct](https://github.com/AIUZ-Terra-Codex-EcoSystem/.terra-legal/blob/main/CODE_OF_CONDUCT.md)
- **Security:** [Security Policy](https://github.com/AIUZ-Terra-Codex-EcoSystem/.terra-legal/blob/main/SECURITY.md)
- **Contributing:** [Contribution Guide](https://github.com/AIUZ-Terra-Codex-EcoSystem/.terra-legal/blob/main/CONTRIBUTING.md)
```

### Step 2 — Create minimal LICENSE file

```
Terra Public License v1.0

Copyright (c) 2025-2026 Abdurashid Abdukarimov
ORCID: 0009-0000-6394-4912
Fractal Metascience Foundation, Tashkent, Uzbekistan

Full license: https://github.com/AIUZ-Terra-Codex-EcoSystem/.terra-legal/blob/main/LICENSE.md

Child Safety First. Educational Freedom. Ethical Technology.
```

### Step 3 — Add CITATION.cff

Use the template from DOCUMENTATION-STANDARD.md.

---

## 📋 FULL INTEGRATION (recommended)

For complete integration, copy these files to your repository:

| Source | Destination | Action |
|--------|-------------|--------|
| .terra-legal/CODE_OF_CONDUCT.md | your-repo/CODE_OF_CONDUCT.md | Copy |
| .terra-legal/CONTRIBUTING.md | your-repo/CONTRIBUTING.md | Copy + customize |
| .terra-legal/SECURITY.md | your-repo/SECURITY.md | Copy |

Or use git submodule:

```bash
git submodule add https://github.com/AIUZ-Terra-Codex-EcoSystem/.terra-legal .terra-legal
ln -s .terra-legal/CODE_OF_CONDUCT.md CODE_OF_CONDUCT.md
ln -s .terra-legal/SECURITY.md SECURITY.md
```

---

## 🏗️ TERRA ECOSYSTEM STRUCTURE

```
Terra Ecosystem
│
├── .terra-legal/              ← This repository (legal layer)
│   ├── LICENSE.md             (TPL-1.0)
│   ├── CODE_OF_CONDUCT.md
│   ├── CONTRIBUTING.md
│   ├── SECURITY.md
│   ├── DOCUMENTATION-STANDARD.md
│   ├── LINKING-INSTRUCTIONS.md
│   ├── CHANGELOG.md
│   └── GOVERNANCE.md
│
├── AIUZ-Terra-codex/          ← Educational platform
├── FMP-monograph/             ← Academic monograph
└── [your-repo]/               ← Links to .terra-legal
```

---

## ✅ VERIFICATION CHECKLIST

After linking, verify:

- [ ] LICENSE or LICENSE.md present with TPL-1.0 reference
- [ ] README.md contains Terra Legal section with badges
- [ ] CODE_OF_CONDUCT.md present
- [ ] SECURITY.md present
- [ ] CITATION.cff present with correct ORCID
- [ ] Repository topics include fractal-metascience and fmp

---

## 📞 REGISTER YOUR REPOSITORY

**Email:** a.abdukarimov@fractal-metascience.org
**Subject:** [TERRA REGISTRY] your-repo-name
**Include:** Repository URL, project description, primary language

---

*© 2025 Abdurashid Abdukarimov. Terra Ecosystem.*
*Version: 1.0.0 — March 2026*
