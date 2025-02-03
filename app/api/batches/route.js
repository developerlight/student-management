import { supabase } from "@/app/lib/supabase";

export async function GET() {
    const {data, error} = await supabase.from('batches').select('*');

    if (error) {
        return Response.json({error: error.message}, {status: 500})
    }

    return Response.json(data, {status: 200})

}

export async function POST(request) {
    const {year} = await request.json();
    const {data, error} = await supabase.from('batches').insert({year});

    if (error) {
        return Response.json({error: error.message}, {status: 500})
    }

    return Response.json(data, {status: 201})
}