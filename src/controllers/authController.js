import jwt from "jsonwebtoken";
export const login = (req, res) => {
  try {
    const { username, password } = req.body;
    if (username === "admin" && password === "password") {
      const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({ token });
    }
    res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};
