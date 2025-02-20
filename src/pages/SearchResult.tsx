import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchForm } from "../components/search/SearchForm";
import { useFlightSearch } from "../hooks/useFlightSearch";
import { FlightList } from "../components/flights/FlightList";
import { Loader2 } from "lucide-react";
import { FlightSearchParams } from "../types/flight";
import { CabinClass } from "../components/search/CabinClassSelector";

export default function SearchResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const params: FlightSearchParams = {
    originSkyId: searchParams.get("origin") || "",
    destinationSkyId: searchParams.get("destination") || "",
    date: searchParams.get("date") || "",
    adults: Math.max(1, parseInt(searchParams.get("adults") || "1")),
    childrens: Math.max(0, parseInt(searchParams.get("children") || "0")),
    infants: Math.max(0, parseInt(searchParams.get("infants") || "0")),
    originEntityId: parseInt(searchParams.get("originEntityId") || "0"),
    destinationEntityId: parseInt(searchParams.get("destinationEntityId") || "0"),
    cabinClass: searchParams.get("cabinClass") || "economy",
    returnDate: searchParams.get("returnDate") || "",
    limit: 20,
  };

  const { flights, isLoading, error } = useFlightSearch(params);

  const initialValues = {
    origin: params.originSkyId,
    destination: params.destinationSkyId,
    date: params.date,
    passengers: {
      adults: params.adults || 1,
      children: params.childrens || 0,
      infants: params.infants || 0,
    },
    originEntityId: params.originEntityId.toString(),
    destinationEntityId: params.destinationEntityId.toString(),
    cabinClass: params.cabinClass as CabinClass,
    returnDate: params.returnDate,
  };

  if (!params.originSkyId || !params.destinationSkyId || !params.date) {
    return (
      <div className="container mx-auto py-4">
        <SearchForm initialValues={initialValues} showBackButton onBack={() => navigate("/")} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-4">
        <SearchForm initialValues={initialValues} showBackButton onBack={() => navigate("/")} />
        <div className="text-center text-red-500 mt-4">{error instanceof Error ? error.message : "An error occurred while fetching flights"}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      <SearchForm initialValues={initialValues} showBackButton onBack={() => navigate("/")} />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <FlightList flights={flights} />
      )}
    </div>
  );
}
