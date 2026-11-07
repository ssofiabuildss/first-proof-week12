# Week 13 — Test log (blank evidence template)

**Do not mark PASS or FIXED until observed.**

| ID | Test / scenario | Expected | Actual evidence | Result | Date / screenshot / commit |
| --- | --- | --- | --- | --- | --- |
| SEC-01 | secrets absent from repo | No secrets | NOT RUN | PENDING | |
| SEC-02 | auth for personal data | Enforced | NOT RUN | PENDING | |
| SEC-03 | cross-user access and unauthenticated API | Blocked | NOT RUN | PENDING | |
| SEC-04 | form input validation | Rejects invalid input safely | NOT RUN | PENDING | |
| SEC-05 | fictional demo only | No real personal data | NOT RUN | PENDING | |
| MECH-01 | valid fictional form | Expected docs status | NOT RUN | PENDING | |
| MECH-02 | missing / malformed fields | Correct guidance | NOT RUN | PENDING | |
| MECH-03 | result comprehension | Non-certification label visible | NOT RUN | PENDING | |
| BUG-01 | genuine bug found | Reproducible failure | NOT OBSERVED | PENDING | |
| FIX-01 | retest after bug correction | Bug absent, regressions pass | NOT RUN | PENDING | |
| DEPLOY-01 | first Week 13 deploy | URL loads | NOT RUN | PENDING | |
| DEPLOY-02 | second Week 13 deploy | URL loads | NOT RUN | PENDING | |

## November 5, 2026 — Mechanical bug reproduction and local correction

BUG-01: Impossible calendar date accepted.

Input: Fictional Excel evidence dated 2026-02-30.
Expected: Incomplete, with Valid assessment date missing.
Actual before fix: Documented, with no missing fields.

Before-fix automated test:
3 passed, 1 failed.

Correction:
Updated lib/evaluate.mjs to validate actual calendar
dates rather than relying only on Date.parse.

After-fix regression:
npm test — 4 passed, 0 failed.
npm run build — successful.
Next.js reported a nonfatal Turbopack root warning.

Status: LOCAL FIX VERIFIED.
Production redeployment and retest: PENDING.

Security note:
The filename audit found only .env.example.
Complete historical secret-content inspection and
live Supabase RLS enforcement remain NOT VERIFIED.

## November 7, 2026 — Supabase RLS inspection

Production table: public.evidence_records

Verified through Supabase dashboard:
- RLS enabled.
- Owner-only SELECT policy present.
- Owner-only INSERT policy present.
- Owner-only DELETE policy present.
- All three policies apply to authenticated users.
- Ownership conditions compare auth.uid() with user_id.

Database evidence:
- Existing records: 9.
- Distinct record owners: 2.
- Simulated anonymous SELECT: 0 visible records.
- Simulated authenticated fictional identity: confirmed.
- Fictional identity SELECT: 0 visible records.

Result: PASS for inspected configuration and simulated reads.

NOT VERIFIED:
- Actual two-account API isolation.
- Unauthorized INSERT and DELETE attempts.
- Server-side validation of direct database submissions.
- Complete historical credential-content audit.

Safety decision:
Use fictional evidence only until remaining checks are
completed or affected functionality is restricted.
