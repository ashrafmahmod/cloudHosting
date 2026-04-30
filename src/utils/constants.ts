export const articlesPerPage = 6;
const productionDomain = "https://cloud-hosting-khaki.vercel.app";
const developmentDomain = "http://localhost:3000";

export const domain =
  process.env.NODE_ENV === "production" ? productionDomain : developmentDomain;
