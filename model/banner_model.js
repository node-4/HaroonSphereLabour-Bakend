const { model, Schema, mongo } = require("mongoose");
const bannerSchema = new Schema(
  {
   role: {
    type: String
   },
    desc: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);
const banner  = model("banner", bannerSchema);

module.exports = banner;


