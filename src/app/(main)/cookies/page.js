export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-4">Last updated: November 21, 2025</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">What Are Cookies</h2>
          <p className="text-gray-700 mb-4">
            Cookies are small text files that are stored on your computer or mobile device
            when you visit our website.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Cookies</h2>
          <p className="text-gray-700 mb-4">
            We use cookies to understand how you use our website and to improve your experience.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Types of Cookies We Use</h2>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Essential cookies - Required for the website to function</li>
            <li>Analytics cookies - Help us understand how visitors use our site</li>
            <li>Preference cookies - Remember your settings and preferences</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Managing Cookies</h2>
          <p className="text-gray-700 mb-4">
            You can control and manage cookies through your browser settings. Please note
            that removing or blocking cookies may impact your user experience.
          </p>
        </div>
      </div>
    </div>
  );
}