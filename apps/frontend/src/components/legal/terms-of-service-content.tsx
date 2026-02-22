'use client';

export function TermsOfServiceContent() {
  return (
    <div className="w-full max-w-none text-slate-700">
      <p className="text-lg leading-relaxed mb-8">
        Welcome to the Boto website (the &ldquo;Site&rdquo;). By accessing or using the Site, you agree to comply with and be bound by the following terms and conditions (&ldquo;Terms of Service&rdquo;).
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">1. Newsletter Subscription</h2>
      <p className="leading-relaxed mb-4">
        You may subscribe to our newsletter to receive updates about our products and promotions. By subscribing to our newsletter, you agree to receive marketing communications from us via email. You can unsubscribe from our newsletter at any time by clicking the &ldquo;unsubscribe&rdquo; link in the email.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">2. Payment</h2>
      <p className="leading-relaxed mb-4">
        If you purchase a subscription to our course, you agree to pay the applicable fees as indicated during the checkout process. All payments are final and non-refundable, unless otherwise specified by law. We may use a third-party payment processor to process your payment, and your payment information will be subject to the processor&apos;s privacy policy.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">3. Use of Cookies</h2>
      <p className="leading-relaxed mb-4">
        We use cookies and similar technologies to track your usage of the Site and for marketing purposes. By using the Site, you consent to the use of cookies in accordance with our Privacy Policy.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">4. Intellectual Property</h2>
      <p className="leading-relaxed mb-4">
        All content on the Site, including but not limited to text, graphics, logos, images, videos, and course content, is the property of Boto or its licensors and is protected by intellectual property laws. You may not reproduce, modify, distribute, or otherwise use any content on the Site without our prior written consent.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">5. Disclaimer</h2>
      <p className="leading-relaxed mb-4">
        The information and content on the Site, including the course content, are provided for informational purposes only and are not intended as professional advice. We make no representations or warranties of any kind, express or implied, about the accuracy, reliability, completeness, or suitability of the information and content on the Site. You use the Site and the course content at your own risk.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">6. Limitation of Liability</h2>
      <p className="leading-relaxed mb-4">
        In no event shall Boto be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Site, the course content, or your subscription to the newsletter, whether based on contract, tort, negligence, strict liability, or otherwise. Our total liability to you for any claim arising out of or in connection with the Site, the course content, or your subscription to the newsletter shall not exceed the total amount paid by you for the course subscription.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">7. Changes to the Terms of Service</h2>
      <p className="leading-relaxed mb-4">
        We may update or modify these Terms of Service from time to time, and any changes will be effective upon posting on the Site. Your continued use of the Site after any such changes constitutes your acceptance of the revised Terms of Service.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">8. Indemnification</h2>
      <p className="leading-relaxed mb-4">
        You agree to indemnify and hold harmless Boto, its affiliates, officers, directors, employees, agents, and licensors from and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable attorney&apos;s fees, arising out of or in connection with your use of the Site, the course content, or your subscription to the newsletter, your violation of these Terms of Service, or your violation of any rights of another party.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">9. Governing Law and Jurisdiction</h2>
      <p className="leading-relaxed mb-4">
        These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction where Boto is headquartered without giving effect to any principles of conflicts of law. You agree to submit to the exclusive jurisdiction of the courts in that jurisdiction for any disputes arising out of or in connection with these Terms of Service or your use of the Site.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">10. Entire Agreement</h2>
      <p className="leading-relaxed mb-4">
        These Terms of Service constitute the entire agreement between you and Boto regarding your use of the Site, the course content, and your subscription to the newsletter and supersede all prior and contemporaneous agreements and understandings, whether oral or written, relating to the same subject matter.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">11. Severability</h2>
      <p className="leading-relaxed mb-4">
        If any provision of these Terms of Service is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">12. Waiver</h2>
      <p className="leading-relaxed mb-4">
        The failure of Boto to enforce any right or provision of these Terms of Service shall not constitute a waiver of that right or provision.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">13. Contact Us</h2>
      <p className="leading-relaxed mb-4">
        If you have any questions or concerns about these Terms of Service, please contact us at{' '}
        <a href="mailto:hi@boto.social" className="text-violet-600 hover:text-violet-700 underline transition-colors">hi@boto.social</a>
      </p>

      <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">14. Third Party Terms</h2>
      <p className="leading-relaxed mb-4">
        Our primary purpose for using information is to publish your content on social networks you&apos;ve authenticated with. We may allow you to link your account on Boto with an account on a third-party social network platform, such as YouTube, and to transfer your information to and from the applicable third-party platform. Once you connect your content to a social media platform, its use will be governed by its terms.
      </p>
      <p className="leading-relaxed mb-4">
        For example, if you choose to connect your YouTube account to the Services, this connection uses YouTube&apos;s API services, and the{' '}
        <a 
          href="https://www.youtube.com/t/terms" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-violet-600 hover:text-violet-700 underline transition-colors"
        >
          YouTube Terms of Service
        </a>
        {' '}will apply to you.
      </p>
    </div>
  );
}
