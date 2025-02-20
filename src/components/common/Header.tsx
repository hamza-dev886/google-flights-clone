/**
 * Header component that displays the application logo and navigation.
 * Contains a link to home and conditionally shows a search flights button when on the home page.
 * Uses react-router-dom for navigation and lucide-react for icons.
 */
import { Link, useLocation } from "react-router-dom";

import { Plane } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  const location = useLocation();

  return (
    <header className="border-b">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Plane className="h-6 w-6" />
            <span className="font-semibold text-xl">Flight Finder</span>
          </Link>

          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/">Home</Link>
            </Button>
            {location.pathname === "/" && (
              <Button variant="default" asChild>
                <Link to="/search-result">Search Flights</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
