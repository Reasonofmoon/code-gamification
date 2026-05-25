# App Factory Feedback Spec

This spec converts the App Factory run results into improvements for both the factory workflow and CodeQuest production readiness.

## Observed Factory Failures

- JSON extraction failed repeatedly at `state-machine` when Gemini returned fenced or truncated JSON.
- `builder-mini-structure` failed until `brand_palette` was supplied manually.
- `L99-meta/inspect-semantic` could not load because module metadata failed schema validation.
- Gemini token-budget warnings appeared for most modules, increasing truncation risk.
- Partial outputs were useful, but the recovery path required manual tier switching and extras-file creation.

## App Factory Requirements

- Preflight required inputs before a chain starts and print a ready-to-run extras-file template when fields are missing.
- Add JSON repair/retry behavior for fenced, truncated, or nearly valid model output before failing a chain.
- Validate all module metadata during startup and separate broken experimental modules from production chains.
- Make provider-aware token budgets explicit, especially for Gemini models where thinking tokens consume output budget.
- Add a ship resume path that can continue from saved envelopes without rerunning successful steps.

## CodeQuest Upgrade Requirements

- Show a production-readiness surface in the app, not only in developer docs.
- Tie readiness gates to the generated production spec: curriculum, onboarding, learning loop, assessment, privacy, accessibility, and release checks.
- Keep the learner-facing copy concise and actionable.
- Preserve local-first privacy: no account or remote progress sync is introduced.
- Keep release verification repeatable through `npm run release:check`.

## Acceptance Criteria

- The home screen exposes progress, next action, and production-readiness gates.
- Privacy and progress-storage behavior are reachable from the app chrome.
- Release gates are documented and executable.
- `npm run release:check` passes.
