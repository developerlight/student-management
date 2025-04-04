
const MainSection = () => {
    return (
        <main className="bg-gray-100 py-16 w-full min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center">
                {/* Text Content */}
                <div className="lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                        Welcome to Student Management
                    </h1>
                    <p className="mt-4 text-gray-600 text-lg">
                        Simplify your student management process with our modern and intuitive platform.
                    </p>
                    <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition">
                        Get Started
                    </button>
                </div>

                {/* Image */}
                <div className="lg:w-1/2 mb-10 lg:mb-0">
                    <img
                        src={'/images/architecture-signs.jpg'}
                        alt="Student Management Illustration"
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </main>
    );
};

export default MainSection;