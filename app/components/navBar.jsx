const Navbar = () => {
    return ( 
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <a href="/" className="text-white text-lg font-semibold">MyApp</a>
                <ul className="flex space-x-4">
                    <li>
                        <a href="/" className="text-gray-300 hover:text-white">Home</a>
                    </li>
                    <li>
                        <a href="/students" className="text-gray-300 hover:text-white">Siswa</a>
                    </li>
                    <li>
                        <a href="/contact" className="text-gray-300 hover:text-white">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
     );
}
 
export default Navbar;