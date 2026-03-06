export type Cocktail = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
};

export type CocktailResponse = {
  drinks: Cocktail[] | null;
};
