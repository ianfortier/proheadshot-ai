import React from 'react';
import { GeneratedImage, HeadshotStyle } from '../types';
import { Download, Loader2, AlertTriangle } from 'lucide-react';
import { HEADSHOT_STYLES } from '../constants';

interface ResultsGalleryProps {
  results: GeneratedImage[];
}

export const ResultsGallery: React.FC<ResultsGalleryProps> = ({ results }) => {
  if (results.length === 0) return null;

  const getStyleLabel = (styleId: HeadshotStyle) => {
    return HEADSHOT_STYLES.find(s => s.id === styleId)?.label || styleId;
  };

  const handleDownload = (url: string, style: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `pro-headshot-${style.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
        Your Professional Headshots
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {results.map((result) => (
          <div 
            key={result.id} 
            className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">
                {getStyleLabel(result.style)}
              </span>
              {result.isLoading && (
                <span className="text-xs text-blue-600 flex items-center">
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  Generating...
                </span>
              )}
            </div>

            {/* Image Container */}
            <div className="aspect-[4/5] w-full bg-slate-100 relative flex items-center justify-center">
              {result.isLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                  <Loader2 className="w-10 h-10 animate-spin mb-3 text-blue-500" />
                  <p className="text-sm font-medium">Processing AI magic...</p>
                </div>
              ) : result.error ? (
                <div className="p-6 text-center text-red-500">
                  <AlertTriangle className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">{result.error}</p>
                </div>
              ) : (
                <div className="relative w-full h-full group-hover:opacity-100 transition-opacity">
                  <img 
                    src={result.imageUrl} 
                    alt={`Generated ${getStyleLabel(result.style)} headshot`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-[2px]">
                    <button
                      onClick={() => handleDownload(result.imageUrl, getStyleLabel(result.style))}
                      className="bg-white text-slate-900 px-6 py-2.5 rounded-full font-medium flex items-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-200 hover:bg-blue-50"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download High Res
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
