import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { SearchBar } from "../shared/components/molecules/SearchBar";
import { cocktailKeys } from "../shared/keys/cocktails-keys";

type SearchParams = {
  query?: string;
};

export const Route = createFileRoute("/cocktails")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    query: (search.query as string) || "",
  }),
  component: CocktailsPage,
});

function CocktailsPage() {
  const { query } = Route.useSearch();
  const navigate = Route.useNavigate();

  const { data, isLoading, isError } = useQuery(
    cocktailKeys.search(query || ""),
  );

  const handleSearch = (val: string) => {
    navigate({ search: { query: val }, replace: true });
  };

  return (
    <main className="flex flex-col items-center p-10 bg-[#f0f2f5] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Cocktails</h1>

      <SearchBar
        name="search"
        value={query || ""}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {isLoading && <div>Cocktails is loading</div>}
      {isError && <div>Cocktails loading error</div>}

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-4xl w-full">
        {data?.data.drinks ? (
          data.data.drinks.map((drink) => (
            <li
              key={drink.idDrink}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
            >
              <img
                src={`${drink.strDrinkThumb}/preview`}
                alt={drink.strDrink}
                className="rounded-full w-32 h-32 mb-4"
              />
              <h2 className="font-bold text-lg">{drink.strDrink}</h2>
              <p className="text-sm text-gray-500">{drink.strCategory}</p>
            </li>
          ))
        ) : (
          <p className="col-span-3 text-center">Empty</p>
        )}
      </ul>
    </main>
  );
}
