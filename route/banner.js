const app = require("express");

const router = app.Router();


const {
  addBanner,
  getBanner,
  editBanner,
  deleteBanner,
} = require("../controller/banner_controllers");

router.post("/addBanner",  addBanner);
router.get("/getBanner/:role", getBanner);
router.post("/editBanner/:id",  editBanner);
router.delete("/deleteBanner/:id", deleteBanner);

module.exports = router;
