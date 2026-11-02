-- Execute in Supabase SQL Editor after creating the project.
create table if not exists public.evidence_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  assessment_type text not null check (assessment_type in ('Excel','Analytical reasoning','Problem solving')),
  source_label text not null default '' check (char_length(source_label)<=100),
  assessment_date date,
  evidence_note text not null default '' check (char_length(evidence_note)<=500),
  status text not null check (status in ('Documented','Incomplete','Review needed')),
  missing_fields jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);
alter table public.evidence_records enable row level security;
create policy "owner may read" on public.evidence_records for select to authenticated using ((select auth.uid())=user_id);
create policy "owner may insert" on public.evidence_records for insert to authenticated with check ((select auth.uid())=user_id);
create policy "owner may delete" on public.evidence_records for delete to authenticated using ((select auth.uid())=user_id);
create index if not exists evidence_records_owner_time on public.evidence_records(user_id,created_at desc);
