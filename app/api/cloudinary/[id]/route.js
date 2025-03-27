import { supabase } from "@/app/lib/supabase";

export async function GET(request, {params}) {
    const {id} = params;
    // console.log('id:', id);
    const { data, error } = await supabase.from('images').select('id').eq('signature', id).single();

    if (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data, { status: 200 });
}