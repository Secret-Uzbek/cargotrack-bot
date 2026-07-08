# Terra Documentation Standard

**Repository:** `terra-legal`  
**Purpose:** human-readable, source-first, rights-aware documentation across Terra repositories

## Core requirements

Documentation should be:

- consistent without forcing every repository into one identical structure;
- understandable by non-programmers and specialists;
- accessible and compatible with assistive technology;
- prepared for accurate multilingual translation;
- safe for children and vulnerable persons;
- explicit about evidence, status, provenance, rights, and limitations;
- free from fabricated authority, certification, metrics, partners, or implementation claims.

## Repository-specific required files

Required files depend on repository role. A repository must not copy legal files merely to appear complete.

### Minimum public repository surface

| File | Purpose | Requirement |
|---|---|---|
| `README.md` | Role, boundary, reading path, status | Required |
| `LICENSE` or `LEGAL.md` | Accurate rights and licensing scope | Required for a public reusable repository |
| `CITATION.cff` | Citation metadata | Required for research or citation-facing repositories |
| `SECURITY.md` | Vulnerability reporting | Required for software or operational repositories |
| `CONTRIBUTING.md` | Contribution process and rights | Required when external contributions are accepted |
| `CODE_OF_CONDUCT.md` | Participation rules | Required for managed communities |
| `CHANGELOG.md` | Material change history | Recommended |
| `GOVERNANCE.md` | Decision authority and review process | Required where governance claims are made |
| `THIRD_PARTY_NOTICES.md` | External code, media, data, or templates | Required when third-party material is included |
| `REUSE.toml` or SPDX headers | File-level license scope | Required for mixed-license repositories |

No repository automatically requires Terra Public License v1.0. License selection follows the repository role, object class, current grants, ownership, contributors, dependencies, and third-party rights.

## README structure

A public README should normally contain:

```markdown
# Project name

> One-sentence factual description.

## Repository role

What this repository is and what it is not.

## Current status

Implemented, proposed, experimental, archived, publication-ready, or blocked.

## Reading path

The correct order for a human reader.

## Main files or components

Only the files and components that actually exist.

## Licensing and rights

Link to `LICENSE`, `LEGAL.md`, `LICENSES/`, `REUSE.toml`, and third-party notices as applicable.

## Citation

Link to `CITATION.cff` or publication citation.

## Security and responsible use

Link to the relevant local or donor policies.

## Provenance and limitations

Sources, donor relations, unresolved issues, and exclusions.

## Contact

Maintainer or project contact.
```

## Status language

Use precise status terms:

- `concept`;
- `proposal`;
- `draft`;
- `prototype`;
- `implemented`;
- `tested`;
- `validated with stated method`;
- `publication-ready`;
- `released`;
- `archived`;
- `blocked pending review`.

Do not use `complete`, `universal`, `certified`, `official`, `validated`, `secure`, or `compliant` without evidence and a declared reviewing authority or method.

## Writing style

### Language

- English is the controlling repository language unless the repository declares another controlling language.
- Russian, Uzbek Latin, German, and other companion versions may be provided.
- Use clear sentences appropriate to the subject; do not impose an arbitrary word limit that damages precision.
- Define specialized terms and expand acronyms on first use.
- Keep legal, scientific, technical, and ethical meanings distinct.

### Tone

- professional and direct;
- culturally respectful;
- free from promotional inflation;
- honest about uncertainty and incomplete implementation;
- suitable for public and child-safe contexts without oversimplifying technical content.

### Formatting

```markdown
# H1 — document title, normally once
## H2 — major section
### H3 — subsection

**Bold** — key term or warning
*Italic* — work title or limited emphasis
`Code` — filename, command, identifier, or literal value
> Blockquote — source quotation or clearly marked important note
```

Color, emoji, and icons must not be the only carriers of meaning.

## Source-first documentation rule

Before drafting:

1. search the current repository;
2. read the relevant donor and normative files;
3. inspect earlier versions and aliases;
4. identify external primary sources;
5. identify rights and attribution requirements;
6. record unresolved evidence gaps.

During drafting:

- distinguish copied, adapted, translated, condensed, and original material;
- identify factual claims that require sources;
- preserve authorship and provenance;
- avoid silently changing normative meaning;
- apply Detox continuously.

After drafting:

- verify links, status claims, dates, names, citations, license scope, and metadata;
- check that no secrets or unnecessary personal data are published;
- update TraceLog for material changes;
- run validation and audit.

## Licensing and rights section

A repository's documentation must not contradict its license files.

For mixed repositories, document:

- object classes;
- applicable file-level licenses;
- canonical texts in `LICENSES/`;
- historical grants and version boundaries;
- third-party exclusions;
- trademark and endorsement boundaries;
- policies that are separate from the copyright or software license.

A link to `terra-legal` does not automatically apply any license.

## Citation metadata

`CITATION.cff` should describe the actual object and type.

Example:

```yaml
cff-version: 1.2.0
message: "If you use this work, please cite it as below."
type: software
title: "Repository title"
authors:
  - family-names: "Abdukarimov"
    given-names: "Abdurashid Abdulkhamitovich"
    orcid: "https://orcid.org/0009-0000-6394-4912"
repository-code: "https://github.com/OWNER/REPOSITORY"
version: "1.0.0"
```

Add `license` only when one coherent SPDX license expression accurately describes the cited object. For mixed repositories, explain licensing in the message or abstract and link to `LEGAL.md` rather than entering a false single license.

Add a DOI or release date only after the deposit and release have been verified.

## Multilingual documentation

Recommended structure:

```text
docs/
├── en/
├── ru/
├── uz-Latn/
└── de/
```

Translation rules:

1. identify the controlling source version;
2. translate meaning, not visual form alone;
3. preserve legal and technical identifiers exactly where required;
4. disclose machine assistance and human-review status;
5. do not call a translation controlling or legally equivalent without qualified review;
6. update translations when the controlling source changes materially.

## Linking standard

Internal:

```markdown
[Contribution Guide](./CONTRIBUTING.md)
```

Cross-repository:

```markdown
[FMP Central](https://github.com/Secret-Uzbek/FMP-CENTRAL-REPO)
[Terra Legal](https://github.com/AIUZ-Terra-Codex-EcoSystem/terra-legal)
```

Use the current repository name `terra-legal`, not `.terra-legal`.

State what a cross-repository link means. A link alone does not create licensing, governance, certification, partnership, or endorsement.

## Documentation checklist

- [ ] Repository role and boundary are explicit
- [ ] Status claims match evidence
- [ ] Reading path is usable by a human
- [ ] Internal and external links resolve
- [ ] Author, maintainer, and rights-holder names are accurate
- [ ] License files, README, `CITATION.cff`, release, and DOI metadata agree
- [ ] Third-party materials and exclusions are visible
- [ ] No secrets or unnecessary personal data are present
- [ ] Accessibility does not depend only on color, motion, icons, or custom fonts
- [ ] Machine-assisted text has been reviewed
- [ ] Translations identify source and review status
- [ ] Material changes are recorded in TraceLog
- [ ] Detox completed before, during, and after the change

## Versioning

Use versions only where they help readers distinguish stable released states.

A released version must preserve its historical documentation and license status. Later edits do not erase the conditions or metadata of an earlier release.

## Maintainer

Abdurashid Abdulkhamitovich Abdukarimov  
ORCID: 0009-0000-6394-4912  
Email: `a.abdukarimov@fractal-metascience.org`
