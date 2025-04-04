const About = () => {
    return (
        <div className="about container min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="max-w-7xl bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row transform transition duration-500 hover:scale-105">
                {/* Bagian Kiri: Foto */}
                <div className="w-full md:w-1/3 flex items-center justify-center mb-6 md:mb-0">
                    <img
                        src={'/images/beach-boat.jpg'}
                        alt="About Us"
                        className="rounded-lg shadow-md"
                    />
                </div>
                {/* Bagian Kanan: Konten */}
                <div className="w-full md:w-2/3 md:pl-6">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        About Us
                    </h1>
                    <p className="text-gray-600 text-lg mb-6">
                        Welcome to our student management system! We aim to provide the best
                        tools to manage and track student progress efficiently. Our platform
                        is designed with modern technology to ensure a seamless experience.
                    </p>
                    <div className="flex justify-start">
                        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transform transition duration-300 hover:scale-110">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;