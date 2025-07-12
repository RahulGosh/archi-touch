import React from 'react';

const ContactForm = () => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <form className="space-y-6">
        {/* Name Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700">NAME</label>
          <div className="flex flex-wrap md:flex-nowrap gap-4 mt-2">
            <input
              type="text"
              placeholder="First name"
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Email Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700">EMAIL</label>
          <input
            type="email"
            placeholder="Your email"
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Message Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700">MESSAGE</label>
          <textarea
            placeholder="Let’s build something beautiful"
            rows="4"
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-black"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-6 py-3 text-white bg-black rounded-full hover:bg-gray-800 transition-colors duration-300"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
