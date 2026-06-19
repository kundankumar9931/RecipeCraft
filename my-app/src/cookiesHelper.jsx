import Cookies from "js-cookie";

export const setRecipeVisitCookie = () => {
  Cookies.set("visitedRecipes", "true", { expires: 7 });
};

export const getRecipeVisitCookie = () => {
  return Cookies.get("visitedRecipes");
};

export const removeRecipeVisitCookie = () => {
  Cookies.remove("visitedRecipes");
};
