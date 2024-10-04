import { createClient } from '@supabase/auth-helpers-sveltekit';
import * as env from '$env/static/public';
//disable eslint error with exclamation point
/* eslint-disable  @typescript-eslint/no-non-null-assertion */
export const supabase = createClient(env.PUBLIC_SUPABASE_URL!, env.PUBLIC_SUPABASE_ANON_KEY!);
