// Prosty middleware do obsługi opcjonalnego logowania w Vercel
export default function handler(req, res) {
  const userEmail = req.headers["x-vercel-user-email"];
  const userName = req.headers["x-vercel-user-name"];

  if (req.method === "GET") {
    // Zwróć informację o użytkowniku
    res.json({
      isLoggedIn: !!userEmail,
      user: userEmail
        ? {
            email: userEmail,
            name: userName || userEmail.split("@")[0],
          }
        : null,
    });
  } else if (req.method === "POST") {
    // Logout - przekierowanie do strony głównej
    res.redirect("/");
  }
}
