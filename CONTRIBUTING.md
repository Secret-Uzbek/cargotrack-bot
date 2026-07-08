# Contributing to cargotrack-bot

`cargotrack-bot` is an implementation utility repository: a Telegram bot and
Cloudflare Worker for cargo/freight matching. Contributions may affect bot
behavior, the freight-matching REST API, or the D1 database schema.

## Before contributing

Read:

1. [README.md](./README.md)
2. [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
3. [SECURITY.md](./SECURITY.md)
4. [terra-legal DOCUMENTATION-STANDARD.md](https://github.com/AIUZ-Terra-Codex-EcoSystem/terra-legal/blob/main/DOCUMENTATION-STANDARD.md)

## Repository setup

```bash
git clone https://github.com/Secret-Uzbek/cargotrack-bot.git
cd cargotrack-bot
git checkout -b feature/clear-change-name
```

## Contribution scope

Useful contributions include:

- fixing bugs in the load-parsing regex (`parse_load_request` in `bot.py`,
  `parseLoadText` in `fsr_worker.js`);
- improving the Telegram command set or the `/api/loads` REST API;
- adding tests for parsing logic and D1 queries;
- correcting documentation, encoding, or broken links;
- adding verified translations.

Do not submit:

- confidential material;
- credentials or access tokens (Telegram bot token, `LOG_CHAT_ID`, Cloudflare
  Worker secrets);
- personal data not necessary for the public record;
- fabricated citations, authority, partnerships, or validation claims.

## Licensing of contributions

This repository is released under `CC0-1.0` (see `CITATION.cff`). A
contribution to this repository is contributed under the same license unless
otherwise stated.

## Required workflow

1. Search the repository before drafting.
2. Open an issue for a material behavior change.
3. Create a focused branch.
4. Make the smallest coherent change.
5. Test changes locally (`python bot.py` against a test bot token, or
   `wrangler dev` for the Worker) before opening a pull request.
6. Submit a pull request with a clear rationale.

## Pull request description

```markdown
## Purpose

## Change type
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Translation

## Testing
- Tested locally:
- Related endpoints/commands:

## Related Issues
```

## Child-safety and security reports

Use the process in [SECURITY.md](./SECURITY.md). This repository stores
Telegram user IDs and names in the `loads` table — treat as personal data and
minimize what is shared in a public issue.

## Maintainer

Abdurashid Abdulkhamitovich Abdukarimov  
ORCID: 0009-0000-6394-4912  
Email: `a.abdukarimov@fractal-metascience.org`
