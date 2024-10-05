import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export const load = (async ({ params }) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const sqlResponse: any = await supabase
		.from('scores')
		.select('score,combo_one,combo_two,combo_three,created_at,profiles (full_name,avatar_url,id)')
		.eq('user_made_by', params.userid);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	// console.log('///////////////////////////////////////////');
	// console.log(data);
	// console.log('///////////////////////////////////////////');

	return {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		playerIconString: sqlResponse.data[0].profiles!.avatar_url,
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		playerName: sqlResponse.data[0].profiles!.full_name,
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		scores: sqlResponse.data
	};
}) satisfies PageServerLoad;
