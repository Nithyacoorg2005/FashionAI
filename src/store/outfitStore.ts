import { create } from 'zustand';
import { Outfit, Season, Occasion, OutfitPlan } from '../types';
import { addDays, format } from 'date-fns';

interface OutfitState {
  outfits: Outfit[];
  plans: OutfitPlan[];
  isLoading: boolean;
  error: string | null;
  createOutfit: (outfit: Partial<Outfit>) => void;
  updateOutfit: (id: string, updates: Partial<Outfit>) => void;
  deleteOutfit: (id: string) => void;
  addPlan: (plan: Partial<OutfitPlan>) => void;
  updatePlan: (id: string, updates: Partial<OutfitPlan>) => void;
  deletePlan: (id: string) => void;
  getOutfitsByOccasion: (occasion: Occasion) => Outfit[];
  getOutfitsBySeason: (season: Season) => Outfit[];
  getPlansForDateRange: (startDate: Date, endDate: Date) => OutfitPlan[];
  getFavoriteOutfits: () => Outfit[];
}

// Mock data for the MVP
const today = new Date();
const mockOutfits: Outfit[] = [
  {
    id: '1',
    userId: '1',
    name: 'Casual Summer Day',
    items: ['1', '2', '5'],
    occasion: [Occasion.Casual],
    season: [Season.Summer],
    favorite: true,
    timesWorn: 3,
    dateAdded: new Date('2023-06-01')
  },
  {
    id: '2',
    userId: '1',
    name: 'Office Meeting',
    items: ['1', '4', '5'],
    occasion: [Occasion.Office, Occasion.SemiFormal],
    season: [Season.Fall],
    favorite: false,
    timesWorn: 1,
    dateAdded: new Date('2023-09-15')
  },
  {
    id: '3',
    userId: '1',
    name: 'Weekend Brunch',
    items: ['3', '5'],
    occasion: [Occasion.Casual, Occasion.SemiFormal],
    season: [Season.Summer],
    favorite: true,
    timesWorn: 2,
    dateAdded: new Date('2023-07-10')
  }
];

const mockPlans: OutfitPlan[] = [
  {
    id: '1',
    userId: '1',
    date: today,
    outfitId: '1',
    weatherData: {
      temperature: 28,
      condition: 'sunny',
      precipitation: 0,
      humidity: 65,
      windSpeed: 10
    }
  },
  {
    id: '2',
    userId: '1',
    date: addDays(today, 1),
    outfitId: '2',
    weatherData: {
      temperature: 22,
      condition: 'partly-cloudy',
      precipitation: 20,
      humidity: 70,
      windSpeed: 15
    }
  },
  {
    id: '3',
    userId: '1',
    date: addDays(today, 2),
    outfitId: '3',
    weatherData: {
      temperature: 26,
      condition: 'sunny',
      precipitation: 0,
      humidity: 60,
      windSpeed: 8
    }
  }
];

const useOutfitStore = create<OutfitState>((set, get) => ({
  outfits: mockOutfits,
  plans: mockPlans,
  isLoading: false,
  error: null,
  
  createOutfit: (outfit) => {
    const newOutfit: Outfit = {
      id: Date.now().toString(),
      userId: '1',
      name: outfit.name || `Outfit ${get().outfits.length + 1}`,
      items: outfit.items || [],
      occasion: outfit.occasion || [Occasion.Casual],
      season: outfit.season || [Season.Spring],
      favorite: outfit.favorite || false,
      timesWorn: 0,
      dateAdded: new Date(),
      ...outfit
    };
    
    set(state => ({
      outfits: [...state.outfits, newOutfit]
    }));
  },
  
  updateOutfit: (id, updates) => {
    set(state => ({
      outfits: state.outfits.map(outfit => 
        outfit.id === id ? { ...outfit, ...updates } : outfit
      )
    }));
  },
  
  deleteOutfit: (id) => {
    set(state => ({
      outfits: state.outfits.filter(outfit => outfit.id !== id)
    }));
  },
  
  addPlan: (plan) => {
    const newPlan: OutfitPlan = {
      id: Date.now().toString(),
      userId: '1',
      date: plan.date || new Date(),
      outfitId: plan.outfitId || '',
      ...plan
    };
    
    set(state => ({
      plans: [...state.plans, newPlan]
    }));
  },
  
  updatePlan: (id, updates) => {
    set(state => ({
      plans: state.plans.map(plan => 
        plan.id === id ? { ...plan, ...updates } : plan
      )
    }));
  },
  
  deletePlan: (id) => {
    set(state => ({
      plans: state.plans.filter(plan => plan.id !== id)
    }));
  },
  
  getOutfitsByOccasion: (occasion) => {
    return get().outfits.filter(outfit => outfit.occasion.includes(occasion));
  },
  
  getOutfitsBySeason: (season) => {
    return get().outfits.filter(outfit => outfit.season.includes(season));
  },
  
  getPlansForDateRange: (startDate, endDate) => {
    return get().plans.filter(plan => {
      const planDate = new Date(plan.date);
      return planDate >= startDate && planDate <= endDate;
    });
  },
  
  getFavoriteOutfits: () => {
    return get().outfits.filter(outfit => outfit.favorite);
  }
}));

export default useOutfitStore;