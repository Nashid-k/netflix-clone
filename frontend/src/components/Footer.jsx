const Footer = () => {
  return (
    <footer className="relative z-10 bg-black text-gray-400 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* Grid Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Preferences</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Attribution */}
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://github.com/Nashid-k"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-red-500 hover:text-red-400 transition-colors
                       underline underline-offset-4"
            >
              Nashid
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/Nashid-k/netflix-clone"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-red-500 hover:text-red-400 transition-colors
                       underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Netflix Clone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;