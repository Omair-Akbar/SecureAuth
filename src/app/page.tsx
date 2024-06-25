import { auth } from "@/auth";
import DeleteButton from "@/components/DeleteButton";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient">Omair</a>
          <div className="hidden md:flex space-x-4 items-center">
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">Home</a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">About</a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">Services</a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">Contact</a>
            <div>
              <DeleteButton />            </div>
          </div>
          <div className="md:hidden">
            <DeleteButton />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 animate-fade-in">Welcome to my Website</h1>
          <p className="text-lg md:text-2xl mb-8 animate-fade-in-delay">This is a static website just to show homepage of website <br /><span className="glowing-text text-2xl font-bold text-purple-600">
            Backend Focused
          </span></p>
          <a href="#" className="inline-block bg-white text-blue-500 py-2 px-4 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:bg-gray-200">Learn More</a>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 hover:bg-gradient-to-r from-purple-600 to-blue-500">
              <h3 className="text-2xl font-semibold mb-4">High Performance</h3>
              <p className="text-gray-400">Our solutions are designed to provide high performance and reliability, ensuring your business operates smoothly.</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 hover:bg-gradient-to-r from-purple-600 to-blue-500">
              <h3 className="text-2xl font-semibold mb-4">Scalability</h3>
              <p className="text-gray-400">Easily scale your operations with our flexible and robust infrastructure that grows with your business.</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 hover:bg-gradient-to-r from-purple-600 to-blue-500">
              <h3 className="text-2xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-gray-400">Our dedicated support team is available around the clock to assist you with any issues or questions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Brand. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
