export type User = {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
};

export type ClothingItem = {
  id: string;
  userId: string;
  imageUrl: string;
  category: ClothingCategory;
  subCategory?: string;
  color: string;
  season: Season[];
  occasion: Occasion[];
  tags: string[];
  favorite: boolean;
  lastWorn?: Date;
  timesWorn: number;
  dateAdded: Date;
};

export type Outfit = {
  id: string;
  userId: string;
  name: string;
  items: string[]; // IDs of clothing items
  occasion: Occasion[];
  season: Season[];
  favorite: boolean;
  lastWorn?: Date;
  timesWorn: number;
  dateAdded: Date;
};

export type OutfitPlan = {
  id: string;
  userId: string;
  date: Date;
  outfitId: string;
  eventId?: string; // For calendar integration
  weatherData?: WeatherData;
};

export type WeatherData = {
  temperature: number;
  condition: WeatherCondition;
  precipitation: number;
  humidity: number;
  windSpeed: number;
};

export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  description?: string;
};

export enum ClothingCategory {
  Tops = 'tops',
  Bottoms = 'bottoms',
  Dresses = 'dresses',
  Outerwear = 'outerwear',
  Shoes = 'shoes',
  Accessories = 'accessories',
}

export enum Season {
  Spring = 'spring',
  Summer = 'summer',
  Fall = 'fall',
  Winter = 'winter',
}

export enum Occasion {
  Casual = 'casual',
  WorkFromHome = 'work-from-home',
  Office = 'office',
  Formal = 'formal',
  SemiFormal = 'semi-formal',
  Athletic = 'athletic',
  Special = 'special',
}

export enum WeatherCondition {
  Sunny = 'sunny',
  PartlyCloudy = 'partly-cloudy',
  Cloudy = 'cloudy',
  Rainy = 'rainy',
  Stormy = 'stormy',
  Snowy = 'snowy',
  Foggy = 'foggy',
}

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}