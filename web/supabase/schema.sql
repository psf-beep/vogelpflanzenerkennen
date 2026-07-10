-- Datenbank-Bauplan für die Tabelle `species`.
-- Entspricht docs/datenmodell.md.
-- Anwendung: im Supabase-Dashboard unter "SQL Editor" einfügen und ausführen.

-- Für zufällige UUIDs (in Supabase i. d. R. schon aktiviert).
create extension if not exists pgcrypto;

create table if not exists public.species (
  id                uuid primary key default gen_random_uuid(),
  type              text        not null check (type in ('bird', 'plant')),
  name_common       text        not null,
  name_scientific   text        not null,
  is_native         boolean     not null default true,
  level             integer     not null default 1 check (level between 1 and 6),
  level_variant     text        not null default 'normal' check (level_variant in ('normal', 'stimme')),
  description       text        not null default '',
  fun_fact          text        not null default '',
  distribution_text text        not null default '',
  image_url         text        not null default '',
  sound_url         text,
  image_license     text        not null default '',
  sound_license     text,
  created_at        timestamptz not null default now()
);

-- Schnellere Filter nach Kategorie und Level (Spiel).
create index if not exists species_type_level_idx on public.species (type, level);

-- Row Level Security aktivieren und öffentlichen NUR-Lese-Zugriff erlauben.
-- (Kein Login in Phase 1 → alle dürfen lesen, niemand über die App schreiben.)
alter table public.species enable row level security;

drop policy if exists "Public read species" on public.species;
create policy "Public read species"
  on public.species
  for select
  using (true);
