import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#151a14] text-white">
      <SEOHead
        title="404 Page Not Found | Sphinx Wedding"
        description="The page you are looking for does not exist. Explore Sphinx Wedding services, gallery, and wedding management in Kerala."
        canonicalUrl="https://www.sphinxwedding.com/404"
      />
      <div className="text-center px-4">
        <h1 className="mb-4 text-6xl font-light text-sage">404</h1>
        <p className="mb-6 text-xl text-gray-300">Oops! The celebration page you&apos;re looking for cannot be found.</p>
        <a
          href="/"
          className="inline-block px-8 py-3 rounded-full border border-sage/40 text-sage hover:bg-sage/10 transition-colors uppercase tracking-widest text-xs"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
