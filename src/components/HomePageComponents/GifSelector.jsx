import { useState, useEffect, useCallback } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Icon } from "@iconify/react";

// Usa tu propia API key de GIPHY (esta es una key de desarrollo)
// Obtén una gratis en: https://developers.giphy.com/
const gf = new GiphyFetch("GlVGYHkr3WSBnllca54iNt0yFbjz7L65");

export const GifSelector = ({ onGifSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar GIFs trending al inicio
  const loadTrendingGifs = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await gf.trending({ limit: 20 });
      setGifs(data);
    } catch (error) {
      console.error("Error loading trending GIFs:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadTrendingGifs();
  }, [loadTrendingGifs]);

  // Buscar GIFs
  const searchGifs = useCallback(async (term) => {
    if (!term.trim()) {
      loadTrendingGifs();
      return;
    }
    setLoading(true);
    try {
      const { data } = await gf.search(term, { limit: 20, offset: 0 });
      setGifs(data);
    } catch (error) {
      console.error("Error searching GIFs:", error);
    }
    setLoading(false);
  }, [loadTrendingGifs]);

  // Debounce para la búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      searchGifs(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, searchGifs]);

  const handleGifClick = (gif) => {
    // Obtener la URL del GIF en tamaño medio
    const gifUrl = gif.images.fixed_height.url;
    onGifSelect(gifUrl);
  };

  return (
    <div className="w-full bg-neutral-800 rounded-xl overflow-hidden border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <span className="text-sm font-medium text-white">Buscar GIF</span>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-gray-700 rounded-full transition-colors"
        >
          <Icon icon="mdi:close" className="text-gray-400" />
        </button>
      </div>
      
      {/* Search input */}
      <div className="p-3">
        <div className="relative">
          <Icon 
            icon="mdi:magnify" 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar GIFs..."
            className="w-full bg-neutral-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* GIFs Grid */}
      <div className="h-[250px] overflow-y-auto p-2">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Icon icon="mdi:loading" className="animate-spin text-3xl text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {gifs.map((gif) => (
              <button
                key={gif.id}
                onClick={() => handleGifClick(gif)}
                className="relative aspect-video rounded-lg overflow-hidden hover:ring-2 hover:ring-primary transition-all cursor-pointer group"
              >
                <img
                  src={gif.images.fixed_height_small.url}
                  alt={gif.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </button>
            ))}
          </div>
        )}
        {!loading && gifs.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400">
            No se encontraron GIFs
          </div>
        )}
      </div>

      {/* Powered by GIPHY */}
      <div className="p-2 border-t border-gray-700 flex justify-center">
        <img 
          src="https://giphy.com/static/img/giphy-attribution-marks/powered-by-giphy.png" 
          alt="Powered by GIPHY" 
          className="h-4 opacity-60"
        />
      </div>
    </div>
  );
};
