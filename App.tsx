import React, { useState, useCallback } from 'react';
import { UploadZone } from './components/UploadZone';
import { StyleSelector } from './components/StyleSelector';
import { ResultsGallery } from './components/ResultsGallery';
import { HeadshotStyle, GeneratedImage } from './types';
import { HEADSHOT_STYLES } from './constants';
import { generateHeadshotWithGemini } from './services/geminiService';
import { Camera, Sparkles, ShieldCheck, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<HeadshotStyle[]>([HeadshotStyle.PORTRA]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<GeneratedImage[]>([]);

  const handleImageSelected = useCallback((data: string, mimeType: string) => {
    setUploadedImage({ data, mimeType });
    // Reset results when new image is uploaded
    setResults([]);
  }, []);

  const toggleStyle = useCallback((style: HeadshotStyle) => {
    setSelectedStyles(prev => {
      if (prev.includes(style)) {
        // Prevent deselecting all styles
        if (prev.length === 1) return prev;
        return prev.filter(s => s !== style);
      } else {
        if (prev.length >= 4) return prev; // Limit to 4 max
        return [...prev, style];
      }
    });
  }, []);

  const generateImages = async () => {
    if (!uploadedImage || selectedStyles.length === 0) return;

    setIsGenerating(true);
    
    // Initialize placeholders for selected styles
    const newPlaceholders: GeneratedImage[] = selectedStyles.map(style => ({
      id: `${style}-${Date.now()}`,
      style,
      imageUrl: '',
      isLoading: true
    }));

    setResults(newPlaceholders);
    
    // Process requests - we do them one by one to avoid hitting rate limits easily,
    // though parallel is possible. For UX, seeing them pop in one by one is also nice.
    // For a more robust app, we might run them in parallel. Let's do parallel here.

    const promises = newPlaceholders.map(async (placeholder) => {
      const styleConfig = HEADSHOT_STYLES.find(s => s.id === placeholder.style);
      if (!styleConfig) return;

      try {
        const generatedBase64 = await generateHeadshotWithGemini(
          uploadedImage.data,
          styleConfig.promptModifier,
          uploadedImage.mimeType
        );

        setResults(prev => prev.map(item => 
          item.id === placeholder.id 
            ? { ...item, imageUrl: generatedBase64, isLoading: false } 
            : item
        ));
      } catch (error: any) {
        setResults(prev => prev.map(item => 
          item.id === placeholder.id 
            ? { ...item, isLoading: false, error: "Generation failed. Please try again." } 
            : item
        ));
      }
    });

    await Promise.all(promises);
    setIsGenerating(false);
  };

  const resetApp = () => {
    setUploadedImage(null);
    setResults([]);
    setSelectedStyles([HeadshotStyle.PORTRA]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={resetApp}>
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
              ProHeadshot AI
            </h1>
          </div>
          <div className="hidden md:flex space-x-6 text-sm font-medium text-slate-600">
            <span className="flex items-center"><Zap className="w-4 h-4 mr-1.5 text-amber-500" /> Fast Generation</span>
            <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-500" /> Private & Secure</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        {!uploadedImage && !results.length && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Powered by Gemini 2.5 Flash
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
              Turn your selfie into a <br/>
              <span className="text-blue-600">professional headshot</span>.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Upload a photo and get variety of studio-quality profiles for LinkedIn, 
              Resumes, and Portfolios in seconds.
            </p>
          </div>
        )}

        {/* Main Workflow */}
        <div className="space-y-10">
          
          {/* Step 1: Upload */}
          <section className={results.length > 0 ? 'hidden' : 'block'}>
            <div className="mb-6 flex items-center justify-between">
               <h3 className="text-xl font-semibold text-slate-800">1. Upload Source Image</h3>
               {uploadedImage && (
                 <button 
                   onClick={() => setUploadedImage(null)}
                   className="text-sm text-red-500 hover:text-red-600 font-medium"
                 >
                   Remove
                 </button>
               )}
            </div>
            {!uploadedImage ? (
               <UploadZone onImageSelected={handleImageSelected} />
            ) : (
              <div className="flex justify-center animate-fade-in">
                <div className="relative rounded-2xl overflow-hidden shadow-lg ring-4 ring-white aspect-[3/4] h-64 md:h-80">
                   <img 
                    src={`data:${uploadedImage.mimeType};base64,${uploadedImage.data}`} 
                    alt="Upload preview" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm font-medium text-center">Source Image</p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Step 2: Config (Only shown if uploaded) */}
          {uploadedImage && results.length === 0 && (
            <section className="animate-fade-in">
               <div className="mb-6">
                 <h3 className="text-xl font-semibold text-slate-800">2. Select Styles</h3>
                 <p className="text-slate-500 text-sm mt-1">Choose up to 4 variations for your photoshoot.</p>
               </div>
               <StyleSelector 
                 selectedStyles={selectedStyles} 
                 onToggleStyle={toggleStyle} 
               />
               
               <div className="mt-10 flex justify-center">
                 <button
                   onClick={generateImages}
                   disabled={isGenerating}
                   className={`
                     relative px-8 py-4 rounded-full text-lg font-bold text-white shadow-xl shadow-blue-200
                     transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95
                     ${isGenerating ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600'}
                   `}
                 >
                   {isGenerating ? (
                     <span className="flex items-center">
                       <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                       Generating...
                     </span>
                   ) : (
                     <span className="flex items-center">
                       Generate Headshots <Sparkles className="w-5 h-5 ml-2" />
                     </span>
                   )}
                 </button>
               </div>
            </section>
          )}

          {/* Step 3: Results */}
          {results.length > 0 && (
             <section className="animate-fade-in">
                <div className="flex justify-end mb-4">
                  <button 
                    onClick={() => {
                      setResults([]);
                    }}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg px-4 py-2 hover:bg-blue-50 transition-colors"
                  >
                    Generate New Styles
                  </button>
                </div>
                <ResultsGallery results={results} />
             </section>
          )}
        </div>
      </main>
      
      <footer className="bg-slate-50 border-t border-slate-200 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} ProHeadshot AI. Powered by Gemini 2.5 Flash Image.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;