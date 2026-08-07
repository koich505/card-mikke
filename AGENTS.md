# Project Agent Instructions

## Project

This repository develops a domain specification and later implementation for a Japanese credit card and adjacent deferred-payment product information system.

The source of truth is maintained in Markdown documents under `docs/`.

## Current phase

The project is currently in Domain Specification / Requirements preparation.

Do not jump to DB schema, API design, ORM models, or implementation unless explicitly requested.

## Important documents

Use these documents as primary context:

- `docs/research/02-market-corpus-v2-audited.md`
  - Latest audited market research corpus.
- `docs/research/03-domain-counterexample-audit.md`
  - Counterexample audit against the previous domain model.
- `docs/spec/domain/`
  - Current domain specification.

`docs/research/01-market-corpus-v1.md` is historical evidence only.
If v1 conflicts with v2, prefer v2.

## Core rules

- Do not treat research outputs as final specifications.
- Do not silently fill unknown facts.
- Distinguish unknown, undisclosed, partially disclosed, and disclosed.
- Do not infer transaction-level legal classification from actor-level regulatory registration.
- Do not merge Payment Instrument, Payment Scheme, Funding Method, and Credit Provider.
- Do not merge Member Reward and Partner Revenue Share without explicit justification.
- Do not treat Product Lifecycle and Feature Lifecycle as the same concept.
- Do not create DB tables, columns, ER diagrams, Prisma schema, API endpoints, or UI design unless explicitly requested.

## Work style

When modifying documents:

1. Read the relevant source files first.
2. Preserve evidence and references.
3. Keep terminology consistent across files.
4. Record unresolved issues instead of forcing conclusions.
5. Prefer small, reviewable changes.
6. Summarize changed files at the end.

## Review policy

For reviews, report issues by severity:

- Critical
- Major
- Minor
- Open Question

Do not modify files during review unless explicitly asked.