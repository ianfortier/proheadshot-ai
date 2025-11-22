import React, { useCallback, useState } from 'react';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { MAX_FILE_SIZE_MB, ACCEPTED_IMAGE_TYPES } from '../constants';

interface UploadZoneProps {
  onImageSelected: (base64: string, mimeType: string) => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onImageSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = useCallback((file: File) => {
    setError(null);

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError('Invalid file type. Please upload a JPEG, PNG, or WebP image.');
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File size exceeds ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const base64String = event.target.result as string;
        // Extract pure base64 data and mime type
        const matches = base64String.match(/^data:(.+);base64,(.+)$/);
        if (matches && matches.length === 3) {
           // We pass the FULL string to the parent for display, 
           // but internally we might need just the data part later.
           // For now, passing the full data URL is safer for previewing.
           const mimeType = matches[1];
           const data = matches[2];
           onImageSelected(data, mimeType);
        }
      }
    };
    reader.onerror = () => setError('Failed to read file.');
    reader.readAsDataURL(file);
  }, [onImageSelected]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  }, [processFile]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-8 md:p-12 transition-all duration-300 ease-in-out text-center
          ${isDragging 
            ? 'border-blue-500 bg-blue-50 scale-[1.02]' 
            : fileName 
              ? 'border-emerald-400 bg-emerald-50' 
              : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50 bg-white'
          }
        `}
      >
        <input
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(',')}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`p-4 rounded-full ${fileName ? 'bg-emerald-100' : 'bg-slate-100'}`}>
            {fileName ? (
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            ) : (
              <Upload className="w-8 h-8 text-slate-500" />
            )}
          </div>
          
          <div>
            {fileName ? (
              <>
                <h3 className="text-lg font-semibold text-emerald-800">Photo Uploaded</h3>
                <p className="text-emerald-600 text-sm mt-1">{fileName}</p>
                <p className="text-slate-400 text-xs mt-2">Click or drop to replace</p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-slate-800">Upload your photo</h3>
                <p className="text-slate-500 mt-1">Drag and drop or click to browse</p>
                <p className="text-slate-400 text-sm mt-4">
                  Supported: JPG, PNG, WebP (Max {MAX_FILE_SIZE_MB}MB)
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-lg flex items-center text-red-700 text-sm animate-fade-in">
          <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
};
