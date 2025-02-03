import { supabase } from "@/app/lib/supabase";

export async function GET() {
    const {data, error} = await supabase.from('classes').select('*');

    if (error) {
        return Response.json({error: error.message}, {status: 500})
    }

    return Response.json(data, {status: 200})

}

export async function POST(request) {
    const {name} = await request.json();
    const {data, error} = await supabase.from('classes').insert({name});

    if (error) {
        return Response.json({error: error.message}, {status: 500})
    }

    return Response.json(data, {status: 201})
}