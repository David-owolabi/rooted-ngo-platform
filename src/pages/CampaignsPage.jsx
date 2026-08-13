import { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import { useCampaigns } from "../context/CampaignContext";
import "./CampaignsPage.css";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "mostFunded", label: "Most funded" },
  { value: "titleAsc", label: "Title A–Z" },
];

function CampaignsPage() {
  // useCampaigns() returns undefined if this page ever renders outside
  // <CampaignProvider> — that's a real misconfiguration, not a fake
  // error, so it's treated as the page's error state.
  const campaignsContext = useCampaigns();
  const hasProviderError =
    !campaignsContext || !Array.isArray(campaignsContext.campaigns);

  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Simulates the initial data load. CampaignContext currently seeds
  // synchronously from local data, so there's nothing to actually wait
  // on yet — this stands in for the day that context fetches from a
  // real API, and gives the skeleton state somewhere to show up.
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Debounce the search input ~300ms so filtering doesn't run on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchInput), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const campaigns = hasProviderError ? [] : campaignsContext.campaigns;

  const categories = useMemo(() => {
    return [...new Set(campaigns.map((c) => c.category))];
  }, [campaigns]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const hasActiveFilters = debouncedSearch.trim() !== "" || selectedCategories.length > 0;

  const clearFilters = () => {
    setSearchInput("");
    setDebouncedSearch("");
    setSelectedCategories([]);
  };

  const visibleCampaigns = useMemo(() => {
    let result = campaigns;

    if (debouncedSearch.trim()) {
      const query = debouncedSearch.trim().toLowerCase();
      result = result.filter((c) => c.title.toLowerCase().includes(query));
    }

    if (selectedCategories.length > 0) {
      result = result.filter((c) => selectedCategories.includes(c.category));
    }

    const sorted = [...result];
    switch (sortBy) {
      case "oldest":
        sorted.sort((a, b) => a.id - b.id);
        break;
      case "mostFunded":
        sorted.sort(
          (a, b) => b.raisedAmount / b.goalAmount - a.raisedAmount / a.goalAmount
        );
        break;
      case "titleAsc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "newest":
      default:
        sorted.sort((a, b) => b.id - a.id);
        break;
    }

    return sorted;
  }, [campaigns, debouncedSearch, selectedCategories, sortBy]);

  const renderFilterOptions = () => (
    <div className="campaigns-page__filter-options">
      <h3 className="campaigns-page__filter-heading">Category</h3>
      {categories.map((category) => (
        <label key={category} className="campaigns-page__checkbox">
          <input
            type="checkbox"
            checked={selectedCategories.includes(category)}
            onChange={() => toggleCategory(category)}
          />
          {category}
        </label>
      ))}
      {hasActiveFilters && (
        <button
          type="button"
          className="campaigns-page__clear"
          onClick={clearFilters}
        >
          Clear filters
        </button>
      )}
    </div>
  );

  if (hasProviderError) {
    return (
      <section className="campaigns-page">
        <div className="campaigns-page__state campaigns-page__state--error">
          <h2>Something went wrong</h2>
          <p>
            We couldn't load campaigns right now. Please refresh the page or
            try again shortly.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="campaigns-page">
      <div className="campaigns-page__inner">
        <header className="campaigns-page__header">
          <h1>All campaigns</h1>
          <p>
            Every campaign currently live on Rooted — search, filter, and
            sort to find where you want to put your support.
          </p>
        </header>

        <div className="campaigns-page__toolbar">
          <input
            type="search"
            className="campaigns-page__search"
            placeholder="Search campaigns by title..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Search campaigns by title"
          />

          <button
            type="button"
            className="campaigns-page__filters-btn"
            onClick={() => setIsSheetOpen(true)}
          >
            Filters
            {selectedCategories.length > 0 && (
              <span className="campaigns-page__filters-count">
                {selectedCategories.length}
              </span>
            )}
          </button>

          <select
            className="campaigns-page__sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort campaigns"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                Sort: {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="campaigns-page__layout">
          <aside className="campaigns-page__sidebar">
            {renderFilterOptions()}
          </aside>

          <div className="campaigns-page__content">
            {isLoading ? (
              <div className="campaigns-page__grid" aria-busy="true" aria-label="Loading campaigns">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div className="skeleton-card" key={i}>
                    <div className="skeleton-card__media" />
                    <div className="skeleton-card__body">
                      <div className="skeleton-card__line skeleton-card__line--title" />
                      <div className="skeleton-card__line" />
                      <div className="skeleton-card__line skeleton-card__line--short" />
                      <div className="skeleton-card__bar" />
                    </div>
                  </div>
                ))}
              </div>
            ) : visibleCampaigns.length > 0 ? (
              <div className="campaigns-page__grid">
                {visibleCampaigns.map((campaign) => (
                  <Card key={campaign.id} campaign={campaign} />
                ))}
              </div>
            ) : (
              <div className="campaigns-page__state campaigns-page__state--empty">
                <h2>No campaigns match your filters</h2>
                <p>Try a different search term or category.</p>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={clearFilters}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isSheetOpen && (
        <div
          className="campaigns-page__sheet-backdrop"
          onClick={() => setIsSheetOpen(false)}
        >
          <div
            className="campaigns-page__sheet"
            role="dialog"
            aria-label="Filter campaigns"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="campaigns-page__sheet-header">
              <h3>Filters</h3>
              <button
                type="button"
                className="campaigns-page__sheet-close"
                onClick={() => setIsSheetOpen(false)}
                aria-label="Close filters"
              >
                &times;
              </button>
            </div>

            {renderFilterOptions()}

            <button
              type="button"
              className="btn btn-primary campaigns-page__sheet-apply"
              onClick={() => setIsSheetOpen(false)}
            >
              Show {visibleCampaigns.length} campaign{visibleCampaigns.length === 1 ? "" : "s"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default CampaignsPage;
