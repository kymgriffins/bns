create table public.news (
  id uuid not null default gen_random_uuid (),
  title character varying(255) not null,
  slug character varying(255) not null,
  excerpt text null,
  content jsonb not null default '{"html": "", "plain": ""}'::jsonb,
  cover_image character varying(500) null,
  author_id uuid null,
  category_id uuid null,
  status character varying(20) not null default 'draft'::character varying,
  is_featured boolean null default false,
  reading_time_minutes integer null,
  view_count integer null default 0,
  published_at timestamp with time zone null,
  source character varying(255) null,
  source_url character varying(500) null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone null,
  constraint news_pkey primary key (id),
  constraint news_slug_key unique (slug),
  constraint news_author_id_fkey foreign KEY (author_id) references auth.users (id) on update CASCADE on delete set null,
  constraint news_category_id_fkey foreign KEY (category_id) references categories (id) on update CASCADE on delete set null,
  constraint news_status_check check (
    (
      (status)::text = any (
        (
          array[
            'draft'::character varying,
            'published'::character varying,
            'archived'::character varying,
            'review'::character varying
          ]
        )::text[]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_news_author_id on public.news using btree (author_id) TABLESPACE pg_default;

create index IF not exists idx_news_category_id on public.news using btree (category_id) TABLESPACE pg_default;

create index IF not exists idx_news_status on public.news using btree (status) TABLESPACE pg_default;

create index IF not exists idx_news_published_at on public.news using btree (published_at) TABLESPACE pg_default;

create index IF not exists idx_news_slug on public.news using btree (slug) TABLESPACE pg_default;

create index IF not exists idx_news_is_featured on public.news using btree (is_featured) TABLESPACE pg_default;

create index IF not exists idx_news_deleted_at on public.news using btree (deleted_at) TABLESPACE pg_default;

create index IF not exists idx_news_fts on public.news using gin (
  to_tsvector(
    'english'::regconfig,
    (
      (
        (
          ((title)::text || ' '::text) || COALESCE(excerpt, ''::text)
        ) || ' '::text
      ) || COALESCE((content ->> 'plain'::text), ''::text)
    )
  )
) TABLESPACE pg_default;

create trigger update_news_updated_at BEFORE
update on news for EACH row
execute FUNCTION update_updated_at_column ();