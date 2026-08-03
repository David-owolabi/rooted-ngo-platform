import { createContext, useContext, useState } from "react";
import { initialCampaigns } from "../data/campaigns";

const CampaignContext = createContext();

export function CampaignProvider({ children }) {
  const [campaigns, setCampaigns] = useState(initialCampaigns);

  const addCampaign = (campaign) =>
    setCampaigns((prev) => [...prev, { ...campaign, id: Date.now() }]);

  const updateCampaign = (id, updates) =>
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );

  const deleteCampaign = (id) =>
    setCampaigns((prev) => prev.filter((c) => c.id !== id));

  return (
    <CampaignContext.Provider
      value={{ campaigns, addCampaign, updateCampaign, deleteCampaign }}
    >
      {children}
    </CampaignContext.Provider>
  );
}

export const useCampaigns = () => useContext(CampaignContext);
