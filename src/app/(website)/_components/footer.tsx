import React from 'react';
import { Check as Chess, Facebook, Twitter, Instagram, Youtube, Globe } from 'lucide-react';
import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Logo and About */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <Chess className="h-8 w-8 text-amber-500" />
                            <span className="text-2xl font-bold text-white">ChessMaster</span>
                        </Link>
                        <p className="text-gray-400 mb-4">
                            Join millions of players worldwide in the ultimate chess experience.
                            Play, learn, and connect with chess enthusiasts from around the globe.
                        </p>
                        <div className="flex space-x-4">
                            <SocialLink icon={<Facebook className="h-5 w-5" />} href="#" />
                            <SocialLink icon={<Twitter className="h-5 w-5" />} href="#" />
                            <SocialLink icon={<Instagram className="h-5 w-5" />} href="#" />
                            <SocialLink icon={<Youtube className="h-5 w-5" />} href="#" />
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Play</h3>
                        <ul className="space-y-2">
                            <FooterLink href="#" label="Play Online" />
                            <FooterLink href="#" label="Computer" />
                            <FooterLink href="#" label="Tournaments" />
                            <FooterLink href="#" label="Live Chess" />
                            <FooterLink href="#" label="Daily Chess" />
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Learn</h3>
                        <ul className="space-y-2">
                            <FooterLink href="#" label="Lessons" />
                            <FooterLink href="#" label="Puzzles" />
                            <FooterLink href="#" label="Analysis" />
                            <FooterLink href="#" label="Coaches" />
                            <FooterLink href="#" label="Articles" />
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Community</h3>
                        <ul className="space-y-2">
                            <FooterLink href="#" label="Forums" />
                            <FooterLink href="#" label="Clubs" />
                            <FooterLink href="#" label="Players" />
                            <FooterLink href="#" label="Blogs" />
                            <FooterLink href="#" label="Game Rules" />
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-500 text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} ChessMaster. All rights reserved.
                    </div>
                    <div className="flex flex-wrap justify-center space-x-4 text-sm">
                        <Link href="#" className="text-gray-500 hover:text-gray-300 mb-2 md:mb-0">Terms of Service</Link>
                        <Link href="#" className="text-gray-500 hover:text-gray-300 mb-2 md:mb-0">Privacy Policy</Link>
                        <Link href="#" className="text-gray-500 hover:text-gray-300 mb-2 md:mb-0">Cookie Policy</Link>
                        <div className="flex items-center text-gray-500">
                            <Globe className="h-4 w-4 mr-1" />
                            <select className="bg-transparent border-none text-gray-500 focus:outline-none">
                                <option value="en">English</option>
                                <option value="es">Español</option>
                                <option value="fr">Français</option>
                                <option value="de">Deutsch</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

interface FooterLinkProps {
    href: string;
    label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, label }) => {
    return (
        <li>
            <Link href={href} className="text-gray-400 hover:text-amber-500 transition-colors">
                {label}
            </Link>
        </li>
    );
};

interface SocialLinkProps {
    href: string;
    icon: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon }) => {
    return (
        <a
            href={href}
            className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
        >
            {icon}
        </a>
    );
};

export default Footer;