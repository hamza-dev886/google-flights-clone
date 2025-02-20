import { SearchForm } from "../components/search/SearchForm";

export default function Home() {
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Find Your Flight</h1>
      <p className="text-muted-foreground mb-8">
        Search and compare flights to find the best deals
      </p>
      <div className="mx-auto">
        <SearchForm />
      </div>
    </div>
  );
}
