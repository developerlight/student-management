import { supabase } from "@/app/lib/supabase";
import cloudinary from "@/app/lib/cloudinary";

export async function GET(request, {params}) {
    const {id} = params;
    // console.log('id:', id);
    const { data, error } = await supabase.from('images').select('id').eq('signature', id).single();
    console.log('dataimg:', data);
    if (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data, { status: 200 });
}

export async function PUT(request, { params }) {
    const body = await request.json();
    console.log('body', body)
    const { id } = params;
    const { delete: _, ...update} = body; // Destructure to remove the 'delete' property

    const { data, error } = await supabase
        .from('images')
        .update(update)
        .eq('id', id)
        .select();

    if (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }

    try {
        const result = await cloudinary.uploader.destroy(body.delete);
        console.log('Image deleted from Cloudinary:', result);
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
    }
    // cloudinary.uploader.destroy(body.delete, function(error, result) {console.log(result, error)});
    
    // const res = await fetch(
    //     `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
    //     {
    //       method: "POST",
    //       body: formData,
    //     }
    //   );
    //   await res.json();
    //   return NextResponse.json({
    //     message: "Success",
    //     status: 200,
    //   });

    return Response.json(data, { status: 200 });
}