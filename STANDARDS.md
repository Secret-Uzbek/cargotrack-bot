# Standards

$repo: $(System.Collections.Hashtable.Name)
Layer role: $(System.Collections.Hashtable.Role)

This file binds the repository to the shared Terra donor standard.

## Inheritance rule

This repository inherits its compact standard layer from:

- 	erra-legal/DOCUMENTATION-STANDARD.md
- 	erra-legal/TECHNICAL_GLOSSARY.md
- 	erra-legal/GITHUB_LAYER_MODEL.md

## Local obligations

- keep the public surface English-first;
- do not use fake DOI placeholders;
- keep citation, release, and audit surfaces coherent;
- preserve layer boundaries instead of flattening theory, practice, archive, and governance;
- keep changes traceable and readable for humans first.

## Minimal standard set

- README.md
- CITATION.cff
- CONTRIBUTING.md
- SECURITY.md
- CODE_OF_CONDUCT.md
- DOCUMENTATION-STANDARD.md
- TECHNICAL_GLOSSARY.md
- LIVING_INDEX.md
"@

   = @"
# Living Index

Repository: $(System.Collections.Hashtable.Name)
Layer role: $(System.Collections.Hashtable.Role)

## Current reading path

1. README.md
2. CITATION.cff
3. CONTRIBUTING.md
4. SECURITY.md
5. CODE_OF_CONDUCT.md
6. DOCUMENTATION-STANDARD.md
7. TECHNICAL_GLOSSARY.md
8. workflow files under .github/workflows/

## Donor references

- 	erra-legal/GITHUB_LAYER_MODEL.md
- 	erra-legal/DOCUMENTATION-STANDARD.md
- 	erra-legal/TECHNICAL_GLOSSARY.md

## Use rule

This index is living.
It may evolve as the repository gains stronger structure, but it should always
preserve a readable entry path for humans.
