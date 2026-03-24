const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "say",
    version: "3.0",
    author: "ajmaul",
    category: "fun"
  },

  onStart: async function ({ api, event, args }) {
    const text = args.join(" ");
    if (!text) return api.sendMessage("⚠️ | Write something", event.threadID);

    try {
      // Better anime-style voice (female style)
      const url = `https://api.streamelements.com/kappa/v2/speech?voice=Kimberly&text=${encodeURIComponent(text)}`;

      const path = __dirname + "/cache/anime.mp3";

      const res = await axios.get(url, { responseType: "arraybuffer" });
      fs.writeFileSync(path, res.data);

      api.sendMessage({
        attachment: fs.createReadStream(path)
      }, event.threadID);

    } catch (e) {
      api.sendMessage("❌ Voice error", event.threadID);
    }
  }
};
