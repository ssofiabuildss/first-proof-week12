# FIRST-PROOF · Week 12 Core Build
Rebuild for **Sofia Lopez** · Week 9 MONEY venture · Gap-to-Value Method Step 5.

## Required sequence (do not rewrite history)
1. Review `docs/CHARTER.md`, `docs/PERSONAS.md`, `docs/PACKET.md`. Commit these **before committing implementation**. Keep the actual git history.
2. Generate the visual mockup and save it as `public/first-proof-mockup.png` (required Packet asset, not included automatically).
3. Create Supabase project and run `supabase/schema.sql`. Enable Authentication > Google (configure provider OAuth credentials) and include your Vercel `https://YOUR_DOMAIN/auth/callback` in the allowed redirect URLs.
4. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local` and Vercel environment variables. **Never commit `.env.local` or service-role credentials.**
5. `npm install`; `npm test`; `npm run dev`; manually test auth, save, reload and second-account RLS.
6. Push repository to GitHub; deploy twice to Vercel; connect a **real purchased venture domain** and verify it loads.
7. Screenshot real pages; run a fresh-chat synthetic Persona Test; implement one actual fix and redeploy.
8. Export actual PACKET, PERSONA and BUILDCHAT evidence as PDF, record real commit hashes and deploy URLs, record 3:00 demo + final 0:30 reflection.

## Caveats
The app has not been locally built or browser-tested by merely creating this starter. Credentials, live deployment, real domain, auth and actual RLS tests are pending. No candidate skills are independently verified. Missing fields are never treated as a skills failure. The teacher's Team Blueprint input is a **draft**, not a certified final team agreement.
