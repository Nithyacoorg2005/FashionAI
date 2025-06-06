import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Camera, Tag, Plus } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import useClothingStore from '../../store/clothingStore';
import { ClothingCategory, Season, Occasion } from '../../types';

const ClothingUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [category, setCategory] = useState<ClothingCategory>(ClothingCategory.Tops);
  const [subCategory, setSubCategory] = useState('');
  const [color, setColor] = useState('');
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { uploadItem, isLoading } = useClothingStore();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setIsProcessing(true);
      
      // Simulate AI processing
      setTimeout(() => {
        setCategory(ClothingCategory.Tops);
        setColor('blue');
        setSeasons([Season.Spring, Season.Summer]);
        setOccasions([Occasion.Casual]);
        setIsProcessing(false);
        setStep(2);
      }, 2000);
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
      setIsProcessing(true);
      
      // Simulate AI processing
      setTimeout(() => {
        setCategory(ClothingCategory.Tops);
        setColor('blue');
        setSeasons([Season.Spring, Season.Summer]);
        setOccasions([Occasion.Casual]);
        setIsProcessing(false);
        setStep(2);
      }, 2000);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const toggleSeason = (season: Season) => {
    if (seasons.includes(season)) {
      setSeasons(seasons.filter(s => s !== season));
    } else {
      setSeasons([...seasons, season]);
    }
  };
  
  const toggleOccasion = (occasion: Occasion) => {
    if (occasions.includes(occasion)) {
      setOccasions(occasions.filter(o => o !== occasion));
    } else {
      setOccasions([...occasions, occasion]);
    }
  };
  
  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleSubmit = async () => {
    if (!file) return;
    
    setIsUploading(true);
    
    await uploadItem(file, {
      category,
      subCategory,
      color,
      season: seasons,
      occasion: occasions,
      tags,
      favorite: false,
    });
    
    // Reset form
    setFile(null);
    setPreview(null);
    setCategory(ClothingCategory.Tops);
    setSubCategory('');
    setColor('');
    setSeasons([]);
    setOccasions([]);
    setTags([]);
    setStep(1);
    setIsUploading(false);
  };
  
  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setCategory(ClothingCategory.Tops);
    setSubCategory('');
    setColor('');
    setSeasons([]);
    setOccasions([]);
    setTags([]);
    setStep(1);
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Add New Item
        </h2>
        
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
                onClick={triggerFileInput}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center">
                  <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3" />
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                    Drag and drop your image here, or click to browse
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Supports JPG, PNG, GIF up to 10MB
                  </p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Button
                  onClick={triggerFileInput}
                  variant="outline"
                  icon={<Camera className="w-4 h-4" />}
                >
                  Take a Photo
                </Button>
              </div>
            </motion.div>
          )}
          
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 mb-4 aspect-square">
                    {preview && (
                      <img
                        src={preview}
                        alt="Clothing preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <button
                      onClick={resetForm}
                      className="absolute top-2 right-2 p-1 rounded-full bg-white/80 dark:bg-gray-800/80"
                      aria-label="Remove image"
                    >
                      <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                    
                    {isProcessing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="text-white text-sm">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                          <p>Analyzing image...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ClothingCategory)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    >
                      {Object.values(ClothingCategory).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <Input
                    label="Subcategory"
                    type="text"
                    placeholder="e.g., T-Shirt, Jeans, Sweater"
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                  />
                  
                  <Input
                    label="Color"
                    type="text"
                    placeholder="e.g., Blue, Black, Red"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Seasons
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(Season).map((season) => (
                        <button
                          key={season}
                          type="button"
                          onClick={() => toggleSeason(season)}
                          className={`px-3 py-1 text-sm rounded-full transition-colors ${
                            seasons.includes(season)
                              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {season}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Occasions
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(Occasion).map((occasion) => (
                        <button
                          key={occasion}
                          type="button"
                          onClick={() => toggleOccasion(occasion)}
                          className={`px-3 py-1 text-sm rounded-full transition-colors ${
                            occasions.includes(occasion)
                              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {occasion.replace(/-/g, ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tags
                    </label>
                    <div className="flex items-center mb-2">
                      <Input
                        type="text"
                        placeholder="Add a tag"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        className="flex-grow"
                        icon={<Tag className="w-4 h-4" />}
                      />
                      <Button
                        type="button"
                        onClick={addTag}
                        variant="outline"
                        className="ml-2"
                        icon={<Plus className="w-4 h-4" />}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <div
                          key={tag}
                          className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 px-3 py-1 text-sm rounded-full flex items-center"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} isLoading={isUploading || isLoading}>
                  Save Item
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ClothingUploader;