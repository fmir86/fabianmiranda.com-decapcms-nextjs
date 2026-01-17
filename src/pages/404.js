import Layout from "../components/Layout/Layout";
import SEO from "../components/SEO/SEO";
import Link from "next/link";
import { loadHeaderData, loadFooterData } from "../libs/loadGlobalData";

const NotFound = ({ headerData, footerData }) => {
  return (
    <Layout headerData={headerData} footerData={footerData}>
      <SEO
        title="Page Not Found - Fabian Miranda"
        description="The page you're looking for doesn't exist or has been moved. Let's get you back on track."
        type="website"
      />

      <section className="dark-glow-gradient min-h-[80vh] flex items-center justify-center px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-lightblue text-lg uppercase tracking-widest mb-4">
            Error 404
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            Page Not Found
          </h1>

          <p className="text-xl sm:text-2xl font-light text-gray-300 mb-12">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/" className="lightblue-cta">
              Back to Home
            </Link>

            <Link
              href="/contact"
              className="text-lightblue border border-lightblue px-6 py-4 block w-full sm:w-fit text-center hover:bg-lightblue hover:text-black transition-all duration-300"
            >
              Contact Me
            </Link>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-800">
            <p className="text-gray-400 mb-6">Or explore these pages:</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/services" className="text-lightblue hover:text-magenta transition-colors">
                Services
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/work" className="text-lightblue hover:text-magenta transition-colors">
                Work
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/blog" className="text-lightblue hover:text-magenta transition-colors">
                Blog
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/about" className="text-lightblue hover:text-magenta transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getStaticProps() {
  const headerData = loadHeaderData();
  const footerData = loadFooterData();

  return {
    props: {
      headerData,
      footerData
    }
  };
}

export default NotFound;
