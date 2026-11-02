'use client';
import {createBrowserClient} from '@supabase/ssr';
export function supabaseBrowser(){const u=process.env.NEXT_PUBLIC_SUPABASE_URL;const k=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;if(!u||!k)throw new Error('Supabase env variables required');return createBrowserClient(u,k);}
