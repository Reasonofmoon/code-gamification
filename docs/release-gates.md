# Release Gates

This checklist turns the App Factory production-readiness spec into repeatable gates for CodeQuest releases.

## Required Checks

- `npm run lint`
- `npm run typecheck`
- `npm run build`

Run all release checks with:

```powershell
npm run release:check
```

## Product Gates

- Curriculum: every visible realm has at least one available mission or a clear locked-state reason.
- Onboarding: a new learner can understand the next recommended realm from the home screen.
- Learning loop: home screen exposes completion, mastery, XP, streak, and next action.
- Assessment: mission completion records stars, attempts, best keystrokes when available, and clear date.
- Privacy: progress storage and deletion behavior is documented in the app.
- Accessibility: primary navigation has labels, skip link works, and focus states remain visible.
