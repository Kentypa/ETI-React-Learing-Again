import { createQueryKeys } from "@lukemorales/query-key-factory";
import { cocktailService } from "../services/cocktail-service";

export const cocktailKeys = createQueryKeys("cocktail", {
  search: (query: string) => ({
    queryKey: [{ query }],
    queryFn: () => cocktailService.search(query),
  }),
});
