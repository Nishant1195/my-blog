import Image from 'next/image';
import { FiMail, FiGithub, FiTwitter } from 'react-icons/fi';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About MyBlog</h1>
          <p className="text-xl text-gray-400">
            Learn more about our mission and the team behind the blog
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to MyBlog! We're dedicated to sharing insightful articles, 
              stories, and knowledge across various topics. Our mission is to create 
              a platform where ideas flourish and readers can discover content that 
              inspires, educates, and entertains.
            </p>
          </div>

          <h2 className="text-3xl font-bold mb-4">What We Write About</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Our content spans multiple categories including:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 mb-8">
            <li>Technology and Innovation</li>
            <li>Web Development and Programming</li>
            <li>Design and Creativity</li>
            <li>Business and Entrepreneurship</li>
            <li>Lifestyle and Personal Growth</li>
          </ul>

          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className=" text-gray-900 text-xl font-bold mb-2 text-primary">Quality Content</h3>
              <p className="text-gray-700">
                We prioritize well-researched, thoughtfully written articles that 
                provide real value to our readers.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className=" text-gray-900 text-xl font-bold mb-2 text-primary">Community</h3>
              <p className="text-gray-700">
                Building a community of engaged readers and writers who share 
                knowledge and learn together.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className=" text-gray-900 text-xl font-bold mb-2 text-primary">Innovation</h3>
              <p className="text-gray-700">
                Staying at the forefront of technology and continuously improving 
                our platform.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-gray-900 text-xl font-bold mb-2 text-primary">Accessibility</h3>
              <p className="text-gray-700">
                Making quality content accessible to everyone, regardless of their 
                background or experience.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            We'd love to hear from you! Whether you have questions, feedback, or 
            want to contribute, feel free to reach out.
          </p>
          
          <div className="flex space-x-4">
            <a
              href="/contact"
              className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
            
              <FiMail className="mr-2" />
              Contact Us
            </a>
            <a
              href="https://github.com/nishant1195"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
            
              <FiGithub className="mr-2" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}