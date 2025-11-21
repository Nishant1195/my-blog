export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-4">Last updated: November 21, 2025</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We collect information you provide directly to us when you use our blog,
            subscribe to our newsletter, or contact us.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">
            We use the information we collect to provide, maintain, and improve our services,
            and to communicate with you.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Information Sharing</h2>
          <p className="text-gray-700 mb-4">
            We do not share your personal information with third parties except as described
            in this privacy policy.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Privacy Policy, please contact us at
            contact@myblog.com
          </p>
        </div>
      </div>
    </div>
  );
}