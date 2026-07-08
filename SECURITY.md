# Security Policy

**Repository:** `cargotrack-bot`  
**Maintainer contact:** `a.abdukarimov@fractal-metascience.org`  
**Status:** implementation utility — Telegram bot and Cloudflare Worker for cargo/freight matching

## Scope

This repository contains a Telegram bot (`bot.py`), a Cloudflare Worker with REST API
(`fsr_worker.js`), and a D1 database schema (`schema.sql`) that process free-form
cargo/freight messages and store shipper and carrier Telegram identifiers. Security
review therefore includes:

- accidental publication of the Telegram bot token, `LOG_CHAT_ID`, or Cloudflare
  Worker secrets;
- unsafe Cloudflare Worker permissions or unauthenticated write access to the D1
  database via the REST API (`/api/loads`);
- input validation on free-form Telegram text and REST API payloads;
- privacy of shipper/carrier Telegram IDs and names stored in `loads`;
- misleading production-readiness claims about the bot or worker.

This policy does not claim the existence of a staffed security team.

## Reporting

Report a suspected security issue privately by email:

`a.abdukarimov@fractal-metascience.org`

Use subject prefix: `[SECURITY]`.

Include only the information needed to understand the issue:

- affected file, endpoint, or workflow;
- concise description;
- steps needed to confirm the problem where safe;
- likely impact;
- suggested correction where available.

Do not publish sensitive evidence (tokens, chat IDs, personal data) in a public issue.

No fixed response time is promised. Reports are reviewed according to severity,
available capacity, and the need to protect affected persons or systems.

## Severity

- `critical` — token/secret leak, unauthenticated data write, or personal-data exposure;
- `high` — material risk requiring correction before public reliance or deployment;
- `medium` — limited risk affecting integrity, access, or maintainability;
- `low` — minor issue or hardening opportunity.

## Local Terra service boundary

A local or edge-deployed Terra service is not production-ready merely because it
starts successfully or returns successful responses.

Before use beyond development, review:

- whether the Worker/bot is limited to a private chat/channel or publicly reachable;
- access control on `/api/loads` write and accept endpoints;
- data and log handling for Telegram user IDs and names;
- input validation on the free-form load parser;
- dependency and update status;
- shutdown and correction path.

## Workflow and dependency security

- use minimum required workflow permissions;
- record every external action or dependency;
- prefer reviewed immutable commit references for GitHub Actions;
- do not treat a successful workflow as proof of security or production readiness;
- keep credentials outside committed files (Telegram token, Cloudflare secrets).

## Coordinated correction

When a material issue is confirmed:

1. contain the affected public or operational surface;
2. preserve only the evidence necessary for review;
3. apply the smallest safe correction;
4. repeat validation and the publication gate;
5. record a safe public summary in TraceLog where applicable;
6. avoid publishing details that would increase harm.

## Limitations

This policy is a repository reporting and review process. It is not a warranty,
certification, promise of complete security, or substitute for qualified
professional assessment.
