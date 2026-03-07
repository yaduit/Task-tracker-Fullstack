import express from "express"
import { registerUser,loginUser,logoutUser } from "../controllers/authController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);

router.get("/me", protect, (req, res) => {
  // always return a wrapped object so frontend can treat all auth responses the same
  return res.json({ user: req.user });
})

export default router