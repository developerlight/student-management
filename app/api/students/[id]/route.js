import { supabase } from "@/app/lib/supabase";

export async function GET(request, {params}) {
    const {id} = params;
    const { data, error } = await supabase.from('students').select('*').eq('id', id).single();

    if (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data, { status: 200 });
}

export async function PUT(request, { params }) {
    const body = await request.json();
    const { id } = params;

    const { data, error } = await supabase
        .from('students')
        .update(body)
        .eq('id', id)
        .select();

    if (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data, { status: 200 });
}


export async function DELETE(request, { params }) {
    const { id } = params;

    const { error } = await supabase.from('students').delete().eq('id', id);

    if (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ message: 'Student deleted successfully' }, { status: 200 });
}
