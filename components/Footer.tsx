import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-5">
            <div className="container mx-auto text-center">
                <p className="mb-2">© {new Date().getFullYear()} jinvicky. All rights reserved.</p>
                <div className="flex justify-center space-x-4">
                    <a href="#" className="hover:underline">Contact Us</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;