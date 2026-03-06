import axios from "axios";
import type { CocktailResponse } from "../types/cocktail-type";

export const cocktailService = {
  search: (query: string) =>
    axios.get<CocktailResponse>(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query || "margarita"}`,
    ),
};
