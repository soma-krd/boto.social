'use client';

export function TermsOfServiceContent() {
  return (
    <div className="w-[100%] max-w-[1400px] overflow-y-auto">
      <div className="prose prose-lg max-w-none">
        <p>
          Welcome to the Boto website (the "Site"). By accessing or using the Site, you agree to comply with and be bound by the following terms and conditions ("Terms of Service").
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Newsletter Subscription</h2>
        <p>
          You may subscribe to our newsletter to receive updates about our products and promotions. By subscribing to our newsletter, you agree to receive marketing communications from us via email. You can unsubscribe from our newsletter at any time by clicking the "unsubscribe" link in the email.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Payment</h2>
        <p>
          If you purchase a subscription to our course, you agree to pay the applicable fees as indicated during the checkout process. All payments are final and non-refundable, unless otherwise specified by law. We may use a third-party payment processor to process your payment, and your payment information will be subject to the processor's privacy policy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Use of Cookies</h2>
        <p>
          We use cookies and similar technologies to track your usage of the Site and for marketing purposes. By using the Site, you consent to the use of cookies in accordance with our Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Intellectual Property</h2>
        <p>
          All content on the Site, including but not limited to text, graphics, logos, images, videos, and course content, is the property of Boto or its licensors and is protected by intellectual property laws. You may not reproduce, modify, distribute, or otherwise use any content on the Site without our prior written consent.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Disclaimer</h2>
        <p>
          The information and content on the Site, including the course content, are provided for informational purposes only and are not intended as professional advice. We make no representations or warranties of any kind, express or implied, about the accuracy, reliability, completeness, or suitability of the information and content on the Site. You use the Site and the course content at your own risk.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
        <p>
          In no event shall Boto be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Site, the course content, or your subscription to the newsletter, whether based on contract, tort, negligence, strict liability, or otherwise. Our total liability to you for any claim arising out of or in connection with the Site, the course content, or your subscription to the newsletter shall not exceed the total amount paid by you for the course subscription.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to the Terms of Service</h2>
        <p>
          We may update or modify these Terms of Service from time to time, and any changes will be effective upon posting on the Site. Your continued use of the Site after any such changes constitutes your acceptance of the revised Terms of Service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Boto, its affiliates, officers, directors, employees, agents, and licensors from and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable attorney's fees, arising out of or in connection with your use of the Site, the course content, or your subscription to the newsletter, your violation of these Terms of Service, or your violation of any rights of another party.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Governing Law and Jurisdiction</h2>
        <p>
          These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction where Boto is headquartered without giving effect to any principles of conflicts of law. You agree to submit to the exclusive jurisdiction of the courts in that jurisdiction for any disputes arising out of or in connection with these Terms of Service or your use of the Site.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Entire Agreement</h2>
        <p>
          These Terms of Service constitute the entire agreement between you and Boto regarding your use of the Site, the course content, and your subscription to the newsletter and supersede all prior and contemporaneous agreements and understandings, whether oral or written, relating to the same subject matter.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">11. Severability</h2>
        <p>
          If any provision of these Terms of Service is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">12. Waiver</h2>
        <p>
          The failure of Boto to enforce any right or provision of these Terms of Service shall not constitute a waiver of that right or provision.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">13. Contact Us</h2>
        <p>
          If you have any questions or concerns about these Terms of Service, please contact us at{' '}
          <a 
            href="mailto:hi@boto.social"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            hi@boto.social
          </a>
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">14. Third Party Terms</h2>
        <p>
          Our primary purpose for using information is to publish your content on social networks you've authenticated with. We may allow you to link your account on Boto with an account on a third-party social network platform, such as YouTube, and to transfer your information to and from the applicable third-party platform. Once you connect your content to a social media platform, its use will be governed by its terms.
        </p>
        <p>
          For example, if you choose to connect your YouTube account to the Services, this connection uses YouTube's API services, and the{' '}
          <a 
            href="https://www.youtube.com/t/terms" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            YouTube Terms of Service
          </a>
          {' '}will apply to you.
        </p>
      </div>
    </div>
  );
}

