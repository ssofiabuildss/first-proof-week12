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

## November 8, 2026 — Local feedback test

Implemented a browser-local feedback panel with three
predefined response options.

Verified:
- Feedback panel rendered at localhost:3000/product.
- Local summary displayed 3 responses.
- After clearing feedback, summary displayed 0 responses.
- npm test: 4 passed, 0 failed.
- npm run build: successful.
- git diff --check: no errors.

Limitations:
- Browser-local storage only, not centralized analytics.
- Persistence after page refresh not independently confirmed.
- No real-user feedback or interviews claimed.
- Production deployment of feedback remains pending.

## November 8, 2026 — Result wording verification

Change:
Updated the main documented-result explanation to:
"Information complete — skills and authenticity not verified."

Purpose:
Avoid implying that completed documentation proves
skill proficiency or evidence authenticity.

Verified locally:
- npm test: 4 passed, 0 failed.
- npm run build: successful.
- TypeScript: successful.
- git diff --check: no errors.

Not yet verified:
- Updated wording visible on production.
- Independent user comprehension of the wording.
- Complete direct API security checks.

Status: LOCAL BUILD PASS; PRODUCTION RETEST PENDING.

## November 8, 2026 — Verified production results

Production URL:
https://first-proof-week12.vercel.app/product

Verified from actual production screenshots:
- Feedback panel visible: PASS.
- Three predefined feedback choices visible: PASS.
- Fictional Excel submission: PASS.
- Administrative result "Documented": PASS.
- "Information complete — skills and authenticity not verified": PASS.
- Human-review limitations visible: PASS.
- Fictional record save confirmation: PASS.

Mechanical bug:
- Input: 2026-02-30.
- Expected: Incomplete.
- Before correction: Documented.
- After correction: 4 automated tests passed.
- Production build: PASS.
- Corrected commit: 4e70800.
- Vercel redeployment: READY.

Verified Week 13 commits:
84113e7
4e70800
505bd5e
6318b27
47f2a48

Vercel: Five production deployments reported READY.

Security:
- RLS enabled: PASS.
- Owner-only SELECT, INSERT, DELETE policies: Verified.
- Simulated anonymous read: PASS.
- Simulated unrelated authenticated read: PASS.
- Direct API authorization: NOT VERIFIED.
- Unauthorized direct writes/deletes: NOT VERIFIED.
- Server-side status validation: NOT VERIFIED.
- Restricted-demo enforcement: NOT VERIFIED.

No real-user testing is claimed.

## November 8, 2026 — Restricted production demo verification

Security decision:
Disable client write access to public.evidence_records
until direct API authorization and server-side validation
can be independently verified.

Production Supabase verification:
- REVOKE INSERT, UPDATE, DELETE executed successfully.
- anon INSERT, UPDATE, DELETE: false.
- authenticated INSERT, UPDATE, DELETE: false.
- No explicit INSERT/UPDATE column privileges found.
- SELECT remained available subject to RLS.

Production browser verification:
- Signed-in FIRST-PROOF product page loaded.
- An attempted save returned:
  "Save failed: permission denied for table evidence_records".
- Administrative result showed Incomplete for missing fields.
- Previous saved evidence remained visible.

Result:
PASS — restricted-demo client write protection.

Limitations:
- Direct two-account API isolation remains NOT VERIFIED.
- Unrestricted saving is not approved.
- No real-user testing is claimed.
- Screenshots represent actual November 8 tests.

## November 8, 2026 — Priority UI correction

Reported participants:
Six participants, P1-P6. P1-P3 known; P4-P6 strangers.

Reported problem:
P1, P3 and P6 mentioned the save permission error.
P3 and P6 could not confidently determine whether
their record had been saved.

Priority:
Separate administrative documentation evaluation
from persistent saving.

Before evidence:
November 8 screenshots show the Documented outcome
and an independent permission-denied save message.

Implementation:
- Visible fictional-demo and saving-disabled notice.
- Button explicitly says the check does not save.
- Documented result explicitly states no record was saved.
- Product form no longer attempts a Supabase INSERT.
- Database restrictions remain unchanged.

After-browser screenshots:
PENDING until deployed interface is inspected.

No new real-user retest is claimed.

## November 8, 2026 — Priority-fix final verification

Actual automated test results:
- 7 tests executed.
- 7 passed.
- 0 failed.
- npm run build: successful.
- TypeScript: successful.

Production verification:
- Fictional-demo warning visible before evaluation.
- Button explicitly states the check does not save.
- Documented result explains that no record was saved.
- Existing Supabase write restriction preserved.
- Before-and-after screenshots captured.

Git commit:
6d595b2f7783cb169c7643d52caa3dfaf069b804

Deployment:
https://first-proof-week12-a3og7o110-ssofia1.vercel.app

Remaining limitation:
No independent participant comprehension retest has
been verified after the correction.
