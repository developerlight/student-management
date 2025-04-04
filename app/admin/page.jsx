import { cookies } from "next/headers";
import AdminLayout from "../components/adminLayout";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

const AdminPage = async () => {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
        cookies: () => cookieStore,
    });

    //   const data = supabase.auth.getUser();
    //   console.log(data);
    const { data, error } = await supabase.auth.getUser();
    console.log('user', data);
    // if (!user) {
    //     return (
    //         <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //             <Link href={'/login'}>
    //                 You are not logged in. Click here to go login.
    //             </Link>
    //         </main>
    //     )
    // }
    return (
        <AdminLayout>
            {/* <h1 className="text-2xl font-bold">Welcome, {user.email}</h1> */}
        </AdminLayout>
    );
}

export default AdminPage;