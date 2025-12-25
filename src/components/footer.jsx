import React from 'react';
import { 
  Instagram, 
  Youtube, 
  Facebook, 
  Linkedin, 
  Blend, // Note: Ensure your lucide version supports this or use 'Globe'
  Music2,    // Commonly used as a TikTok substitute in Lucide
  ExternalLink 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#EFEFEF] py-16 px-4 flex flex-col items-center text-center font-sans">
      
      {/* Large Hero Heading */}
      <h1 className="text-7xl md:text-[270px] font-bold text-[#A3A3A3] tracking-tighter mb-16 select-none">
        AllSpace365
      </h1>

      {/* Legal Disclaimer */}
      <div className="max-w-4xl mb-10">
        <p className="text-sm md:text-base text-gray-800 leading-relaxed">
          Please, be informed, that the intellectual property rights to all the photos, designs and other materials on this<br className="hidden md:block" /> 
          Site belong to "YODEZEEN GROUP" LLC. You may request permission to use them by contacting us at:
        </p>
        <a 
          href="mailto:privacy@yodezeen.com" 
          className="text-sm md:text-base text-black font-medium hover:underline block mt-2"
        >
          privacy@yodezeen.com
        </a>
      </div>

      {/* Social Media Icons */}
      <div className="flex flex-wrap justify-center gap-4">
        {[
          { icon: <Instagram size={20} />, link: "#" },
          { icon: <Youtube size={20} />, link: "#" },
          { icon: <Facebook size={20} />, link: "#" },
          { icon: <ExternalLink size={20} />, link: "#" }, // Substitute for Behance
          { icon: <Linkedin size={20} />, link: "#" },
          { icon: <Music2 size={20} />, link: "#" },    // Substitute for TikTok
        ].map((social, index) => (
          <a
            key={index}
            href={social.link}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-[#1A1A1A] text-white hover:bg-black transition-all duration-300"
          >
            {social.icon}
          </a>
        ))}
      </div>
      
    </footer>
  );
};

export default Footer;