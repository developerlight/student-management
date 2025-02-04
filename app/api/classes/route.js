import { supabase } from "@/app/lib/supabase";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const start = (page - 1) * limit;
    const end = start  + limit - 1;

    const {data, error, count} = await supabase
        .from('classes')
        .select('*', {count: 'exact'})
        .order('name', {ascending: true})
        .range(start, end);

    if (error) {
        return Response.json({error: error.message}, {status: 500})
    }

    return Response.json({
        classes: data,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
    })

}

export async function POST(request) {
    const {name} = await request.json();
    const {data, error} = await supabase.from('classes').insert({name});

    if (error) {
        return Response.json({error: error.message}, {status: 500})
    }

    return Response.json(data, {status: 201})
}