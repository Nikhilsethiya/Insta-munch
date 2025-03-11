import { Link } from "react-router-dom";

function PageNotFound () {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <section className="flex items-center h-full p-16 bg-gray-900 text-gray-100 w-full">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl text-gray-600">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-4 mb-8 text-gray-400">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link
              rel="noopener noreferrer"
              to={"../LogIn"}
              className="flex items-center justify-center w-full px-8 py-3 font-semibold rounded-md bg-violet-200 text-gray-900 hover:bg-violet-300 active:bg-violet-300 btnall"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageNotFound;
