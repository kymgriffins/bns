import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Budget Ndio Story',
  description: 'Learn about how Budget Ndio Story uses cookies and similar technologies to enhance your experience.',
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
          Cookie Policy
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            Last updated: {new Date().toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              What Are Cookies?
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Cookies are small text files that are stored on your device when you visit our website. 
              They help us understand how you use our site and provide you with a better experience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              How We Use Cookies
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver personalized advertisements</li>
              <li><strong>Functional Cookies:</strong> Enable enhanced functionality and personalization</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              Cookie Categories
            </h2>
            
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Necessary Cookies
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  These cookies are essential for the website to function. They cannot be disabled.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Analytics Cookies
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  These cookies help us understand how visitors interact with our website by collecting 
                  and reporting information anonymously. This includes Google Analytics.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Marketing Cookies
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  These cookies are used to track visitors across websites. The intention is to display 
                  ads that are relevant and engaging for the individual user. This includes Facebook Pixel.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Functional Cookies
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  These cookies enable enhanced functionality and personalization, such as live chat 
                  support and videos.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              Managing Your Preferences
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              You can manage your cookie preferences at any time by:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 space-y-2">
              <li>Clicking "Cookie Settings" in our cookie banner</li>
              <li>Clearing your browser cookies</li>
              <li>Using browser settings to block cookies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              Third-Party Cookies
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Some cookies are placed by third-party services that appear on our pages. 
              We do not control these cookies. Please review the privacy policies of these third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              If you have any questions about our Cookie Policy, please contact us at{' '}
              <a href="mailto:info@budgetndiostory.org" className="text-emerald-600 hover:underline">
                info@budgetndiostory.org
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
