const Navbar = () => {
    return ( 
        <nav className="bg-gray-800 p-4 w-full shadow-md fixed top-0 left-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
                <a href="/" className="text-white text-lg font-semibold">MyApp</a>
                <ul className="flex space-x-4">
                    <li>
                        <a href="/" className="text-gray-300 hover:text-white">Home</a>
                    </li>
                    <li>
                        <a href="#About" className="text-gray-300 hover:text-white">About</a>
                    </li>
                    <li>
                        <a href="/login" className="text-gray-300 hover:text-white">Login</a>
                    </li>
                </ul>
            </div>
        </nav>
     );
}
 
export default Navbar;