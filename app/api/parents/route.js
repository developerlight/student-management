import { supabase } from "@/app/lib/supabase";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const start = (page - 1) * limit;
    const end = start  + limit - 1;

    const {data, error, count } = await supabase
        .from('parents')
        .select(`
            id,
            student_id (full_name),
            father_name,
            mother_name,
            phone,
            address
            `, {count: 'exact'})
        .order('id', {ascending: true})
        .range(start, end);

    if (error) return Response.json({error: error.message}, {status: 500});

    return Response.json({
        parents: data,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
    })

}

export async function POST(request) {
    const newParent = await request.json();
    const {data, error} = await supabase.from('parents').insert(newParent);
    if (error) {
        return Response.json({error: error.message}, {status: 500})
    }

    return Response.json(data, {status: 201})
}