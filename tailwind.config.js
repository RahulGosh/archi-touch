/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-white': '#ffffff',
        'custom-black-text': "#333",
        'navbar-second-color-white': "#F2EFE9",
          'menu-bg': '#141516',
      },
      padding: {
        'navbar-custom': "30px 55px 28px 55px",
        'navbar-mobile-custom': "25px 20px 25px 20px",
        'hero-padding': "100px 0",
        'content-padding': "50px 20px",
        'content-padding-small': "15px 0px",
        'content-padding-story': "50px 13px",
        'content-padding-aboutUsOurTeamSection': "20px 50px",
        'content-padding-aboutUsOurTeamSection-small': "20px 20px",
      },
      height: {
        'hero-height': "50vh"
      },
      screens: {
        'custom-md': '935px',
        "custom-whyChooseUsText-md": "470px",
        "custom-footer-text-2": "360px",
        "custom-footer-text": "320px",
        "custom-aboutUsOurTeamSection-md": "900px",
        "custom-singleProjectDetail-rightImage": "1300px"
      },
    },
  },
  plugins: [],
};
