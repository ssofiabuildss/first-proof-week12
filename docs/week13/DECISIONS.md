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

## November 8, 2026 — Feedback implementation

Decision:
Add a minimal browser-local feedback mechanism rather
than a new database table.

Reason:
Avoid collecting participant identities or assessment
content while enabling observable feedback testing.

Changes:
- Three predefined feedback choices.
- Browser-local response counts.
- Clear-local-feedback control.

Evidence:
- Local UI screenshots showed 3 responses before clearing
  and 0 responses afterward.
- Automated tests: 4/4 passed.
- Production build: successful.

Limitations:
No centralized analytics or real-user validation claimed.
Direct API security testing remains incomplete.

Next session's first move:
Verify the production feedback deployment, improve
the result wording, and finish security restrictions.

## November 8, 2026 — Result clarity improvement

Decision:
Use the exact Week 13 packet wording for the
completed-documentation result.

Change:
The interface now states:
"Information complete — skills and authenticity not verified."

Rationale:
A complete administrative record must not be confused
with a verified skill, authentic credential or employer waiver.

Verification:
- Automated tests: 4/4 passed.
- Production build: successful.
- Live wording check remains pending.

Security limitation:
Direct API access and unauthorized write restrictions
remain unverified. Real personal evidence must not
be submitted during classroom demonstrations.

Next session's first move:
Verify deployed wording and feedback behavior,
then complete direct API security checks or enforce
a restricted fictional-demo mode.

## November 8, 2026 — Production evidence reconciliation

Decision:
Preserve the existing application and document verified
Week 13 production results.

Evidence:
- Five meaningful Git commits verified.
- Five Vercel deployments READY.
- Fictional Excel workflow confirmed on production.
- Correct non-certification wording visible.
- Feedback panel visible on production.
- Mechanical bug corrected and regression tested.

Security decision:
Do not accept real personal assessment documents.
Direct API authorization and write validation remain
unverified. A visible disclaimer is not a technical
restriction.

Persona Test:
Screenshot-based synthetic testing is permitted.
Unrestricted interactive participant testing is not
approved until security is verified or writes are disabled.

Next first move:
Complete direct API security verification or enforce
and test the restricted-demo fallback.

## November 8, 2026 — Final restricted-demo decision

Decision:
Keep the existing FIRST-PROOF application available
for fictional screenshot-based demonstrations.

Security action:
Revoked INSERT, UPDATE and DELETE table privileges
from PUBLIC, anon and authenticated.

Verification:
- Client table-level write permissions disabled.
- No explicit column-level INSERT/UPDATE grants found.
- Production save attempt rejected by Supabase.

Rationale:
The security floor for unrestricted database writes
could not be fully verified. Disabling those writes
provides an enforceable restricted-demo boundary.

Operational limitation:
Existing records remain readable under RLS.
Users cannot save new evidence through normal
client permissions.

Next move:
Begin the screenshot-based synthetic Persona Test.
Do not claim real-user sessions or unrestricted
security verification.

## November 8, 2026 — Highest-priority user finding

Decision:
Correct the confusion between administrative evaluation
and database saving without reactivating persistence.

Basis:
Six reported participants, including three strangers.
P1, P3 and P6 mentioned the permission error.
P3 and P6 could not tell whether saving succeeded.

Correction:
Use a fictional demonstration with an explicit
saving-disabled warning before submission.
Clarify that Documented means required fields are
complete, not saved or independently verified.

Security:
Keep the existing Supabase write restriction.
No new features or persistence mechanisms.

Next move:
Verify the deployed UI, capture after screenshots,
and conduct an independent comprehension retest.

## November 8, 2026 — Priority-fix verification closure

Decision:
Retain the focused UI correction and keep saving disabled.

Evidence:
Seven automated tests passed, production build succeeded,
and the deployed before-and-after difference was observed.

No further product changes are required for this correction.

Next move:
Conduct an independent participant comprehension retest
and record actual observations without inventing results.
