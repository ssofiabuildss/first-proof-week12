# FIRST-PROOF — PRODUCT CHARTER v1
**Founder:** Sofia Lopez | **Chapter:** Week 9 / MONEY | **Method:** The Gap-to-Value Method
**Status:** Pre-build product decision. Hypotheses and future tests are not presented as observed outcomes.

## VISION
In three years FIRST-PROOF could help students and early-career candidates maintain reusable, clearly scoped evidence of baseline capabilities for employers that voluntarily agree on compatible assessment standards. The service would show exactly which assessment requirement a piece of evidence supports, and which conclusions still need employer judgment. It would only claim to save screening time after participating employers demonstrably replace their equivalent checks.

## USERS
- **First user:** a university student seeking an internship who repeatedly encounters baseline skills assessments (Excel, analytical reasoning or problem-solving).
- **Decision-maker / potential buyer:** an early-career recruiter at an employer that screens applicants for a defined role. No employer acceptance, waiver, or willingness to pay has been verified.
- **First test audience:** synthetic student and recruiter personas; subsequently actual users must be recruited and permission obtained.

## PRINCIPLES
1. Evidence provenance and applicable requirements must be visible.
2. Passing an administrative check never equals independent verification of a person's skill.
3. Missing evidence must be shown as unknown, never converted into a failure or negative score.
4. Employer acceptance and waived assessments must never be claimed without written confirmation and actual substitution.
5. Each user controls their own saved record; protect personal data and make correction possible.

## NON-GOALS
- No automated hiring decisions, candidate ranking, employer endorsements or guarantees of an interview.
- No unproven tenfold savings claims; 10:1 is a hypothesis, not observed performance.
- No real standardized testing engine, external credential authentication, automatic HRIS integrations, or independent competency certification in Week 12.
- No real candidate data in public demos; demo records are explicitly fictional.

## NORTH STAR
**Verified substitution rate (future metric):** number of employer-confirmed equivalent assessment steps waived / number of eligible baseline assessment steps offered to participating employers. **Week 12 proxy:** percentage of test records that are correctly saved and display an evidence-limited, understandable outcome. The proxy does not prove the north star.

## CORE CONCEPTS
1. **Candidate:** a person who owns a saved evidence record.
2. **Requirement:** a defined baseline evidence field an employer might request.
3. **Evidence record:** candidate-submitted description of an assessment result or artifact; self-reported, not independently verified in this build.
4. **Source:** the stated origin of the evidence; not proof of authenticity.
5. **Rule check:** deterministic check of whether required fields are present and coherent.
6. **Status:** administrative label `Documented`, `Incomplete`, or `Review needed`, not a skill grade.
7. **Review:** decision reserved for an authorized human when interpretation/acceptance exceeds automatic checks.
8. **Waiver:** employer-confirmed removal of a redundant assessment; not implemented or claimed in Week 12.

## SCOPE LOCK
The sole Week 12 feature is a signed-in user's ability to enter a fictional baseline assessment record, run transparent field checks, see limitations, and save/read their own record. No extra features until this end-to-end loop works.

## BLUEPRINT CONDITIONS (provisional source)
The supplied team Blueprint is explicitly marked draft. Translate its proposed safeguards into the build: source visible, unknowns explicit, user correction, no automatic exclusion, human judgment for consequential outcomes, and no fabricated employer acceptance. Do not describe draft conditions as a final unanimous team vote.
