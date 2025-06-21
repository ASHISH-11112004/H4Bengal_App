import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                {/* <Image
                  src="/assets/TenantTrust.png"
                  
                  width={24}
                  height={24}
                  className="rounded object-contain"
                /> */}
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">TenantTrust</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Revolutionizing rental agreements with AI-powered security, fraud
              detection, and transparent processes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/create-agreement"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Create Agreement
                </Link>
              </li>
              <li>
                <Link
                  href="/fraud-detection"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Fraud Detection
                </Link>
              </li>
              <li>
                <Link
                  href="/analytics"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Analytics
                </Link>
              </li>
              <li>
                <Link
                  href="/auth"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Civic Auth
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">
                  support@tenanttrust.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">
                  Sister Nivedita University, Kolkata
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 TenantTrust. All rights reserved. Built with security
            and privacy in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
