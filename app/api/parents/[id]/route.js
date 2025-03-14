import { supabase } from "@/app/lib/supabase";

export async function GET(request, {params}) {
    const {id} = params;
    const { data, error } = await supabase.from('parents').select(`
        id,
        student_id (id,full_name),
        father_name,
        mother_name,
        phone,
        address
        `).eq('id', id).single();

    if (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data, { status: 200 });
}

export async function PUT(request, { params }) {
    const body = await request.json();
    const { id } = params;
    console.log('body', body);
    console.log('id', id);
    const { data, error } = await supabase
        .from('parents')
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

    const { error } = await supabase.from('parents').delete().eq('id', id);

    if (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ message: 'Student deleted successfully' }, { status: 200 });
}
