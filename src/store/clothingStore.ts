import { create } from 'zustand';
import { ClothingItem, ClothingCategory, Season, Occasion } from '../types';

interface ClothingState {
  items: ClothingItem[];
  isLoading: boolean;
  error: string | null;
  uploadItem: (file: File, metadata: Partial<ClothingItem>) => Promise<void>;
  updateItem: (id: string, updates: Partial<ClothingItem>) => void;
  deleteItem: (id: string) => void;
  getItemsByCategory: (category: ClothingCategory) => ClothingItem[];
  getItemsBySeason: (season: Season) => ClothingItem[];
  getItemsByOccasion: (occasion: Occasion) => ClothingItem[];
  getFavorites: () => ClothingItem[];
}

// Mock data for the MVP
const mockClothingItems: ClothingItem[] = [
  {
    id: '1',
    userId: '1',
    imageUrl: 'https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: ClothingCategory.Tops,
    subCategory: 'T-Shirt',
    color: 'blue',
    season: [Season.Spring, Season.Summer],
    occasion: [Occasion.Casual],
    tags: ['cotton', 'favorite'],
    favorite: true,
    timesWorn: 5,
    dateAdded: new Date('2023-05-10')
  },
  {
    id: '2',
    userId: '1',
    imageUrl: 'https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: ClothingCategory.Bottoms,
    subCategory: 'Jeans',
    color: 'blue',
    season: [Season.Fall, Season.Winter, Season.Spring],
    occasion: [Occasion.Casual, Occasion.WorkFromHome],
    tags: ['denim', 'everyday'],
    favorite: false,
    timesWorn: 12,
    dateAdded: new Date('2023-02-15')
  },
  {
    id: '3',
    userId: '1',
    imageUrl: 'https://images.pexels.com/photos/6208684/pexels-photo-6208684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: ClothingCategory.Dresses,
    subCategory: 'Casual Dress',
    color: 'green',
    season: [Season.Summer],
    occasion: [Occasion.Casual, Occasion.SemiFormal],
    tags: ['floral', 'summer'],
    favorite: true,
    timesWorn: 3,
    dateAdded: new Date('2023-06-20')
  },
  {
    id: '4',
    userId: '1',
    imageUrl: 'https://images.pexels.com/photos/6046183/pexels-photo-6046183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: ClothingCategory.Outerwear,
    subCategory: 'Jacket',
    color: 'black',
    season: [Season.Fall, Season.Winter],
    occasion: [Occasion.Casual, Occasion.Office],
    tags: ['leather', 'warm'],
    favorite: false,
    timesWorn: 8,
    dateAdded: new Date('2023-01-05')
  },
  {
    id: '5',
    userId: '1',
    imageUrl: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: ClothingCategory.Shoes,
    subCategory: 'Sneakers',
    color: 'white',
    season: [Season.Spring, Season.Summer, Season.Fall],
    occasion: [Occasion.Casual, Occasion.Athletic],
    tags: ['comfortable', 'everyday'],
    favorite: true,
    timesWorn: 20,
    dateAdded: new Date('2023-03-10')
  }
];

const useClothingStore = create<ClothingState>((set, get) => ({
  items: mockClothingItems,
  isLoading: false,
  error: null,
  
  uploadItem: async (file, metadata) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate uploading and AI processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, we would upload the file to a server and process with AI
      // For now, we'll create a mock item
      const newItem: ClothingItem = {
        id: Date.now().toString(),
        userId: '1',
        imageUrl: URL.createObjectURL(file),
        category: metadata.category || ClothingCategory.Tops,
        color: metadata.color || 'unknown',
        season: metadata.season || [Season.Spring],
        occasion: metadata.occasion || [Occasion.Casual],
        tags: metadata.tags || [],
        favorite: metadata.favorite || false,
        timesWorn: 0,
        dateAdded: new Date(),
        ...metadata
      };
      
      set(state => ({ 
        items: [...state.items, newItem],
        isLoading: false 
      }));
    } catch (error) {
      set({ error: 'Failed to upload item', isLoading: false });
    }
  },
  
  updateItem: (id, updates) => {
    set(state => ({
      items: state.items.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    }));
  },
  
  deleteItem: (id) => {
    set(state => ({
      items: state.items.filter(item => item.id !== id)
    }));
  },
  
  getItemsByCategory: (category) => {
    return get().items.filter(item => item.category === category);
  },
  
  getItemsBySeason: (season) => {
    return get().items.filter(item => item.season.includes(season));
  },
  
  getItemsByOccasion: (occasion) => {
    return get().items.filter(item => item.occasion.includes(occasion));
  },
  
  getFavorites: () => {
    return get().items.filter(item => item.favorite);
  }
}));

export default useClothingStore;