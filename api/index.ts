import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "@hono/node-server/vercel";
import auth from "../server/routes/auth";
import packagesRoute from "../server/routes/packages";
import prostanonePackagesRoute from "../server/routes/prostanonePackages";
import menosetPackagesRoute from "../server/routes/menosetPackages";
import testimonialsRoute from "../server/routes/testimonials";
import blog from "../server/routes/blog";
import data from "../server/routes/data";

const app = new Hono().basePath("/api");

app.onError((err, c) => {
  console.error("[unhandled]", err);
  return c.json({ error: "Internal server error" }, 500);
});

app.use(
  "*",
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [
            "https://prostanone.vercel.app",
            "https://prostanone-dev.vercel.app",
            "https://www.holisbotanicals.com",
            ...(process.env.VITE_FRONTEND_URL ? [process.env.VITE_FRONTEND_URL] : []),
          ]
        : ["http://localhost:3000"],
    credentials: true,
  }),
);

app.route("/auth", auth);
app.route("/packages/prostanone", prostanonePackagesRoute);
app.route("/packages/menoset", menosetPackagesRoute);
app.route("/prostanone/packages", prostanonePackagesRoute);
app.route("/menoset/packages", menosetPackagesRoute);
app.route("/packages", packagesRoute);
app.route("/testimonials", testimonialsRoute);
app.route("/blog", blog);
app.route("/", data);

export default handle(app);
