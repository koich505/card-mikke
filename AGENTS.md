# Project Agent Instructions

## Project

This repository develops a Japanese-language information site for credit cards and adjacent deferred-payment products available in Japan.

The source of truth is maintained in Markdown documents under `docs/`.

Repository structure and placement rules are defined in `docs/README.md`. AI behavior instructions and their loading rules are defined in `.ai/README.md`.

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
- `docs/README.md`
  - Source-of-truth locations, target repository structure, and artifact placement rules.
- `.ai/README.md`
  - Target AI instruction structure, context loading order, and tool-specific boundaries.

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
- Codex may create ordinary local commits in this repository after the applicable deterministic checks and reviews pass. This project-level delegation does not extend to other AI roles unless this file explicitly names them.
- Codex and all other AI agents must not connect to a Git remote or remote repository service. `fetch`, `pull`, `push`, `clone`, remote submodule updates, remote API/CLI operations, opening or merging pull requests, and other network-backed Git operations require a human. Codex works only with the local repository.
- Codex must not rewrite published or existing history (`commit --amend`, rebase, reset, force operations) unless a human explicitly requests the exact local operation. Reviewers remain read-only and never commit.
- Do not create DB tables, columns, ER diagrams, Prisma schema, API endpoints, detailed UI design, or implementation unless explicitly requested.
- Keep project artifacts under `docs/`, tool-independent AI instructions under `.ai/`, and tool-managed integration files under their designated directories.
- Do not assume that a file under `.ai/` is automatically loaded or executed. Use it only through an explicit reference from the active agent or tool adapter.
- Follow the active structures in `docs/README.md` and `.ai/README.md`. Do not duplicate the same source-of-truth content across multiple paths.

## Work style

When modifying documents:

1. Read `docs/README.md`, `.ai/README.md`, and the relevant source files first.
2. Load only the shared and layer-specific AI instructions needed for the task.
3. Preserve evidence and references.
4. Keep terminology consistent across files.
5. Record unresolved issues instead of forcing conclusions.
6. Prefer small, reviewable changes.
7. Summarize changed files at the end.

When implementation begins, follow `docs/process/00-development-workflow.md` and the quality gates in `docs/process/02-quality-gates.md`.

## Review policy

For reviews, report issues by severity:

- Critical
- Major
- Minor
- Open Question

Critical and Major findings block delivery. Do not modify files during review unless explicitly asked.
