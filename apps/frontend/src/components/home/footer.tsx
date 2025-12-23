'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-[#0E0E0E] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
          {/* Left Section */}
          <div className="max-w-md">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
              Made in Kurdistan
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              We turn your ideas into clean, working code.
            </p>
          </div>

          {/* Right Section - Contact */}
          <div>
            <h3 className="text-gray-500 text-sm mb-4">Contact</h3>
            <a
              href="mailto:hi@boto.social"
              className="text-white hover:text-gray-300 transition-colors"
            >
              hi@boto.social
            </a>
          </div>
        </div>

        {/* Large boto Logo */}
        <div className="mt-16 md:mt-24 flex justify-center">
          <Image
            src="/logo-text.svg"
            alt="boto"
            width={1000}
            height={300}
            className="w-full max-w-5xl h-auto"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Boto Social.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link
                href="/privacy-policy"
                className="text-gray-500 hover:text-white transition-colors text-sm"
              >
                Privacy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-500 hover:text-white transition-colors text-sm"
              >
                Terms
              </Link>
              <Link
                href="/auth/login"
                className="text-gray-500 hover:text-white transition-colors text-sm"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="text-gray-500 hover:text-white transition-colors text-sm"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
