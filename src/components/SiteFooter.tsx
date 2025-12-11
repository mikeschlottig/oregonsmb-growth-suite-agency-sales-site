import React from 'react';
import { Building } from 'lucide-react';
export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 lg:col-span-5">
              <div className="mb-4">
                <a href="/" className="inline-flex items-center gap-2" aria-label="OregonSMB">
                  <Building className="h-8 w-8 text-primary" />
                  <span className="font-display text-2xl font-bold text-white">OregonSMB</span>
                </a>
              </div>
              <div className="text-sm">
                Your partner in local business growth. We provide the tools and visibility you need to succeed in Southern Oregon.
              </div>
            </div>
            <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h6 className="text-white font-semibold mb-4">Solutions</h6>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">For Business</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Find a Pro</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h6 className="text-white font-semibold mb-4">Company</h6>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
              <div>
                <h6 className="text-white font-semibold mb-4">Legal</h6>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} OregonSMB. All rights reserved.</p>
            <p className="mt-1">Built with ❤️ at Cloudflare</p>
          </div>
        </div>
      </div>
    </footer>
  );
}