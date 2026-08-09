# Domain Specification Policy

## 目的

Domain Specificationでは、実装に入る前にConcept、責務、境界、関係、不変条件、Scenario、Open Questionを定義する。

## 対象外

以下は作成しない。

- DB Schema
- Table
- Column
- SQL
- Prisma Schema
- ORM Model
- JSON Schema
- API設計
- ER図
- UI設計
- Class設計

## Conceptの定義形式

主要なDomain Conceptについて、以下を記載する。

- Definition
- Responsibility
- Identity
- Lifecycle
- Relationships
- Invariants
- Boundaries
- Examples
- Counterexamples
- Temporal Behavior
- Evidence Requirements
- Open Questions

## 主要な境界

常に以下の境界を確認する。

- Actor / Organization / Role
- Product / Offering / Variant
- Payment Instrument / Payment Scheme / Funding Method
- Regulatory Registration / Legal Classification
- Member / External Membership / Account
- Reward / Economic Flow
- Product Lifecycle / Feature Lifecycle
- Source / Evidence / Domain Fact
