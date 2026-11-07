# Week 13 — Decisions log

## Session 1 — Packet preparation
- Venture: reuse FIRST-PROOF from Week 12 rather than create an unrelated app.
- Priority hypothesis: avoid misleading results that imply certification; real user observations may change the priority.
- Mandatory safeguard: do not accept real personal documents through unverified data paths.
- Do not report any Week 13 code change, bug fix, deployment, interview or security pass until observed.
- Next move: inspect the real GitHub repository and deployment, then create the precise implementation prompt. Record actual links, dates and evidence.

## Session close (fill after each real coding session)
- Date/time:
- Decision made:
- What changed and why:
- Tests run and results:
- Commit SHA:
- Push confirmation:
- Deployment URL:
- Next session's first move:

## November 5, 2026 — Development session

Decision: Correct the observed invalid-calendar-date bug
without rebuilding the existing Week 12 application.

Changes:
- Added strict calendar-date validation.
- Added an automated regression test.
- Preserved the existing evaluation workflow.

Verified tests:
- Before correction: 3 passed, 1 failed.
- After correction: 4 passed, 0 failed.
- Production build: successful.

Limitations:
- No Week 13 deployment verified yet.
- Live Supabase security remains unverified.
- No real-user testing claimed.

Next session's first move:
Verify the pushed correction, complete the security gate,
and prepare a controlled Vercel deployment.

## November 7, 2026 — Security verification

Decision:
Preserve the existing owner-only RLS policies because
their production configuration matches the intended design.

Evidence:
- RLS and three ownership policies inspected in Supabase.
- Nine existing records across two owners.
- Anonymous and fictional authenticated read simulations
  returned zero visible records.

Limitation:
Direct API isolation and unauthorized writes remain unverified.
No full security PASS is claimed.

Next session's first move:
Verify direct API restrictions and implement privacy-minimized
feedback without storing personal data.
