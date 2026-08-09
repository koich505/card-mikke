# Project Agent Instructions

## Project

This repository develops a Japanese-language information site for credit cards and adjacent deferred-payment products available in Japan.

The source of truth is maintained in Markdown documents under `docs/`.

## Current phase

The project is currently in Requirements preparation. The Domain Specification is ready as a conditional input, and the development workflow has been documented, but application implementation has not started.

Do not jump to DB schema, API design, ORM models, detailed UI design, or implementation unless explicitly requested. Do not initialize or configure Spec Kit, OpenCode, Ollama, or CI merely because they are named in the workflow documents.

## Important documents

Use these documents as primary context:

- `docs/research/02-market-corpus-v2-audited.md`
  - Latest audited market research corpus.
- `docs/research/03-domain-counterexample-audit.md`
  - Counterexample audit against the previous domain model.
- `docs/spec/domain/`
  - Current domain specification and unresolved domain questions.
- `docs/process/`
  - Adopted development workflow, responsibility boundaries, quality gates, tools, and open decisions.

`docs/research/01-market-corpus-v1.md` is historical evidence only. If v1 conflicts with v2, prefer v2.

## Core rules

- Do not treat research outputs as final specifications.
- Do not silently fill unknown facts.
- Distinguish unknown, undisclosed, partially disclosed, and disclosed.
- Do not infer transaction-level legal classification from actor-level regulatory registration.
- Do not merge Payment Instrument, Payment Scheme, Funding Method, and Credit Provider.
- Do not merge Member Reward and Partner Revenue Share without explicit justification.
- Do not treat Product Lifecycle and Feature Lifecycle as the same concept.
- Do not fix Architecture or DB structures that depend on blocking questions in `docs/spec/domain/12-open-questions.md`.
- For user-facing features, do not enter implementation planning until the required UI mock is approved.
- Treat one feature slice as one branch and one pull request unless an approved exception is documented.
- AI agents must not commit, push, open or merge pull requests. These actions require a human.
- Do not create DB tables, columns, ER diagrams, Prisma schema, API endpoints, detailed UI design, or implementation unless explicitly requested.

## Work style

When modifying documents:

1. Read the relevant source files first.
2. Preserve evidence and references.
3. Keep terminology consistent across files.
4. Record unresolved issues instead of forcing conclusions.
5. Prefer small, reviewable changes.
6. Summarize changed files at the end.

When implementation begins, follow `docs/process/00-development-workflow.md` and the quality gates in `docs/process/02-quality-gates.md`.

## Review policy

For reviews, report issues by severity:

- Critical
- Major
- Minor
- Open Question

Critical and Major findings block delivery. Do not modify files during review unless explicitly asked.
