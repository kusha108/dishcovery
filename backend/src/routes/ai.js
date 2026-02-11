const router = require("express").Router();

const auth = require("../middlewares/auth");
const ai = require("../controllers/aiController");

/* ===========================
   PUBLIC AI
=========================== */

router.post("/recommend", ai.recommend);
router.post("/healthier", ai.healthier);
router.post("/generate-steps", ai.generateSteps);
router.post("/generate", ai.recommend);

/* ===========================
   PROTECTED AI
=========================== */

router.get("/personal", auth, ai.personalized);

module.exports = router;
