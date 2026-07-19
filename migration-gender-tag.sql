-- Run this in the nesti-staging Supabase SQL Editor

alter table products
  add column gender_tag text not null default 'unisex'
  check (gender_tag in ('boy', 'girl', 'unisex'));

-- Optional: index for faster filtering
create index idx_products_gender_tag on products(gender_tag);
