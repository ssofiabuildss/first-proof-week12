# FIRST-PROOF — Final Mechanical Test Log

Date: November 1, 2026
Production: https://first-proof-week12.vercel.app/

## 1. Functional Tests

| Test | Observed result | Status |
|---|---|---|
| Sign-in gate | Signed-out page displayed "Sign in first to use the save function." | PASS — UI |
| Missing fields | Incomplete status and missing fields displayed | PASS — UI |
| Complete fields | Documented classification verified by automated test | PASS — automated |
| Future dates | Invalid future dates rejected by automated test | PASS — automated |
| Source limit | Input stopped at 100 characters | PASS — UI |
| Description limit | Input stopped at 500 characters | PASS — UI |
| Save response | "Record saved to your private history." | PASS — UI |
| Persistence | Saved record remained after refresh | PASS — UI |
| Public routes | Home, Product and About loaded | PASS — UI |
| Account B visibility | No Account A records visible | PASS — UI |
| Account A visibility | Account B's test record was not visible | PASS — UI |
| Direct database RLS | No completed direct authenticated database test supplied | NOT VERIFIED |
| Custom domain | No domain purchased or connected | NOT COMPLETED |

UI results were observed and reported by the student.
Automated tests: 3 passed, 0 failed.
A successful UI check does not prove database-level authorization.

## 2. Real Bug — Test, Fix and Redeploy

Input: Fictional Excel record with missing source, date and description.

Expected: Incomplete status and successful saving.

Observed before fix:
- Incomplete appeared correctly.
- Saving displayed "Save failed: [object Object]".
- Production screenshot was provided.

Fix:
- Commit f3b1278.
- Empty assessment date converted to null.
- Error rendering improved.
- Automated tests: 3/3 passed.
- Production build: successful.
- Vercel redeployment: READY.

Production retest:
- Incomplete displayed.
- "Record saved to your private history." displayed.
- Saved record remained visible after refresh.

Result: PASS — observed bug corrected and retested.

## 3. Supabase Account Isolation

Account A: Original signed-in Google account.
Account B: Separate Google account in Incognito.

Account B observed an empty saved history.
Account A observed its own three records.
Account B's "RLS-ACCOUNT-B-TEST" did not appear in Account A's history.

Result: PASS — UI-level cross-user visibility in both directions.

Limitations:
- Direct Supabase RLS enforcement NOT VERIFIED.
- Unauthorized cross-owner INSERT/DELETE NOT VERIFIED.
- Source-code policies are not independent database proof.

## 4. Synthetic Persona Test

Persona: Daniela Ruiz, 21, university internship applicant.
Synthetic persona feedback, NOT real-world validation.

Scope: Public pages only.
Authenticated evaluation results and private records were not accessed.

Single confusion:
Product page, Section 3 — Your saved evidence history.

Original wording:
"Only records associated with your authenticated account should appear (Supabase RLS)."

One correction:
"Your saved evidence history is intended to show only records associated with your signed-in account."

Correction commit: 7c2d8b2
Vercel deployment: READY.
Corrected wording visible on production: PASS — student-confirmed.

## 5. Final Requirement Status

- Git commit minimum: MET.
- Vercel deployment minimum: MET.
- Mechanical UI testing: PASS as documented.
- Real bug fix and redeployment: PASS.
- UI-level account isolation: PASS.
- Direct Supabase RLS enforcement: NOT VERIFIED.
- Custom-domain requirement: NOT COMPLETED.
- No domain purchased.
- Working URL: https://first-proof-week12.vercel.app/
- Build Chat PDF: Remaining deliverable.
- Final demo video: Remaining deliverable.
