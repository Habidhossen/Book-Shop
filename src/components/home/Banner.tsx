const Banner = () => {
  return (
    <section className="flex items-center justify-center h-[500px] mt-20 bg-gradient-to-r from-yellow-100 to-blue-50">
      <div className="text-center max-w-3xl space-y-6 px-4">
        <h1 className="text-gray-800 font-bold text-4xl xl:text-5xl">
          Discover Your Next Favorite
          <span className="text-indigo-600"> Book</span>
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Explore a world of stories and knowledge. Find books across all
          genres, from bestsellers to hidden gems, tailored to every readers
          taste.
        </p>
        <div>
          <p className="text-gray-800 pb-3">
            Subscribe to our newsletter for exclusive deals and updates!
          </p>
          <div className="flex items-center justify-center space-x-3">
            <input
              type="text"
              placeholder="Enter your email"
              className="text-gray-500 border outline-none p-3 rounded-md w-full max-w-md"
            />
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-md shadow hover:bg-indigo-700 ">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
