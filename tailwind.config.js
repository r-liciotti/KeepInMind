/** @type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require("@iconify/tailwind")

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flyonui"),
    require("flyonui/plugin"),
    addDynamicIconSelectors()
  ],
  flyonui: {
    themes: ["gourmet", "dark"],
  },
  "tailwind-class-sorter.classRegex": {
    "rescript": [
      "className\\w*?=\\w*(\"[\\s\\S]+?\")|className\\w*?=\\w*?\\{([\\s\\S]+?)\\}",
      "\"(.+?)\""
    ],
  },

}
