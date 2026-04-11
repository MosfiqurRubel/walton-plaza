const Footer = () => {
  return (
    <footer className="bg-footer text-[#042f56]">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
        <nav className="space-x-4">
          <a href="/privacy" className="hover:underline">
            Privacy
          </a>
          <a href="/terms" className="hover:underline">
            Terms
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
