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
              Open Source
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Forked from{' '}
              <a
                href="https://postiz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Postiz
              </a>
              . Free and open source social media scheduling tool.
            </p>
          </div>

          {/* Right Section - GitHub */}
          <div>
            <h3 className="text-gray-500 text-sm mb-4">Source Code</h3>
            <a
              href="https://github.com/soma-krd/boto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
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
              <a
                href="https://soma.krd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors text-sm"
              >
                soma.krd
              </a>
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
