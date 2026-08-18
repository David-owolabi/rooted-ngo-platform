import { createContext, useContext, useState, useEffect } from "react";

const API_URL = "http://localhost:3001/campaigns";
const CampaignContext = createContext();

export function CampaignProvider({ children }) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load campaigns:", err);
        setLoading(false);
      });
  }, []);

  const addCampaign = async (campaign) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(campaign),
    });
    const newCampaign = await res.json();
    setCampaigns((prev) => [...prev, newCampaign]);
  };

  const updateCampaign = async (id, updates) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const updated = await res.json();
    setCampaigns((prev) => prev.map((c) => (c.id === id ? updated : c)));
  };

  const deleteCampaign = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <CampaignContext.Provider
      value={{ campaigns, loading, addCampaign, updateCampaign, deleteCampaign }}
    >
      {children}
    </CampaignContext.Provider>
  );
}

export const useCampaigns = () => useContext(CampaignContext);