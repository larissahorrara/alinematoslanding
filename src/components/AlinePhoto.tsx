import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, CheckCircle2 } from 'lucide-react';

interface AlinePhotoProps {
  className?: string;
  imgClassName?: string;
  showBadge?: boolean;
}

export const AlinePhoto: React.FC<AlinePhotoProps> = ({
  className = '',
  imgClassName = '',
  showBadge = true,
}) => {
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Candidates for Github / public folder variations:
  // aline.jpg, aline.png, aline.jpeg, aline (with or without leading slash)
  const candidateUrls = [
    '/aline.jpg',
    '/aline.png',
    '/aline.jpeg',
    '/aline',
    'aline.jpg',
    'aline.png',
    'aline.jpeg',
    'aline',
    './aline.jpg',
    './aline.png',
  ];

  useEffect(() => {
    // 1. Check if user already loaded in localStorage
    const saved = localStorage.getItem('aline_custom_photo');
    if (saved) {
      setPhotoSrc(saved);
      return;
    }

    // 2. Cascade test of candidate URLs (aline.jpg, aline.png, aline, etc.)
    let isCancelled = false;

    const tryLoadCandidates = async () => {
      for (const url of candidateUrls) {
        if (isCancelled) return;
        const loaded = await new Promise<boolean>((resolve) => {
          const img = new Image();
          img.onload = () => {
            // Verify it's a real image and not SPA HTML index fallback
            if (img.width > 20 && img.height > 20) {
              resolve(true);
            } else {
              resolve(false);
            }
          };
          img.onerror = () => resolve(false);
          img.src = url;
        });

        if (loaded && !isCancelled) {
          setPhotoSrc(url);
          return;
        }
      }
    };

    tryLoadCandidates();

    const handleSync = () => {
      const updated = localStorage.getItem('aline_custom_photo');
      if (updated) setPhotoSrc(updated);
    };

    window.addEventListener('aline_photo_updated', handleSync);
    return () => {
      isCancelled = true;
      window.removeEventListener('aline_photo_updated', handleSync);
    };
  }, []);

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        localStorage.setItem('aline_custom_photo', base64);
        setPhotoSrc(base64);
        window.dispatchEvent(new Event('aline_photo_updated'));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div
      className={`relative group ${className}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className={`relative overflow-hidden rounded-3xl shadow-2xl bg-slate-900 border transition-all min-h-[420px] flex items-center justify-center ${
        isDragging ? 'border-emerald-400 ring-4 ring-emerald-400/40 bg-slate-800' : 'border-slate-800'
      }`}>
        
        {photoSrc ? (
          /* Rendered Actual Real Photo */
          <>
            <img
              src={photoSrc}
              alt="Aline Matos - REVENDEDORA de planos de saúde há mais de 15 anos"
              className={`w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102 ${imgClassName}`}
            />
            
            {/* Subtle bottom gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />

            {/* Quick button to replace photo if needed */}
            <div className="absolute top-3 right-3 z-20">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white/80 hover:text-white border border-white/20 text-xs transition-all cursor-pointer shadow-lg"
                title="Trocar ou atualizar foto"
              >
                <Upload className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </>
        ) : (
          /* Executive Clean Card with 1-Click File Linker */
          <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center bg-gradient-to-b from-slate-900 to-slate-950 text-white space-y-4">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-950/50">
              <Camera className="w-10 h-10 text-emerald-400" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">Aline Matos</h3>
              <p className="text-xs font-bold text-emerald-400 mt-1 uppercase tracking-wider">
                REVENDEDORA de planos de saúde há mais de 15 anos
              </p>
              <p className="text-xs text-slate-400 mt-2 max-w-xs">
                Foto oficial (aline.jpg / aline.png no GitHub)
              </p>
            </div>

            <div className="pt-3 w-full max-w-xs">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl transition-all cursor-pointer hover:scale-102"
              >
                <Camera className="w-4 h-4 fill-slate-950" />
                <span>Clique para exibir a foto aline.jpg</span>
              </button>
              <p className="text-[11px] text-slate-400 mt-2">
                Ou arraste e solte o arquivo <strong>aline</strong> aqui
              </p>
            </div>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Overlay Badge at Base of Photo */}
        {showBadge && (
          <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-md border border-slate-700 text-white p-3.5 rounded-2xl shadow-xl z-20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
                  Aline Matos
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Online" />
                </p>
                <p className="text-[11px] text-emerald-400 font-bold leading-tight mt-0.5">
                  REVENDEDORA de planos de saúde há mais de 15 anos
                </p>
              </div>
              <div className="text-right pl-3 border-l border-slate-700 shrink-0">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Atuação</span>
                <span className="text-xs font-extrabold text-slate-100">BH & RMBH</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Decorative accent */}
      <div className="absolute -bottom-2 -right-2 -z-10 w-full h-full rounded-3xl bg-emerald-600/20 blur-md pointer-events-none" />
    </div>
  );
};
