import Chatbot from '../components/Chatbot.jsx';

const Home = () => (
  <div className="min-h-screen h-full bg-gray-900 p-4 sm:p-6 lg:p-8 flex flex-col">
    <div className="flex-1 container mx-auto flex flex-col">
      <h1 className="text-3xl font-bold text-white mb-6 text-center sm:text-left">
        Welcome to the E-commerce Chatbot
      </h1>
      <div className="flex-1 flex flex-col">
        <Chatbot />
      </div>
    </div>
  </div>
);

export default Home;
