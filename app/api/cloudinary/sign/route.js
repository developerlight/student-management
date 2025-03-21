export async function POST (req, res) {
    try {
        const response = res;
        console.log(response);
    } catch (error) {
        console.error("Cloudinary Signature Error:", error);
        return Response.json({ error: "Failed to sign request" }, { status: 500 });
        
    }
}