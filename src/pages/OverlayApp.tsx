import { useState, useEffect } from 'react'

declare global {
  interface Window {
    electronAPI?: {
      setOpacity: (opacity: number) => void;
      closeWindow: () => void;
    };
  }
}

function OverlayApp() {
  const [hint, setHint] = useState('Waiting for question...')
  const [opacity, setOpacity] = useState(100)

  useEffect(() => {
    console.log('=== App Mounted ===')
    console.log('electronAPI available:', !!window.electronAPI)
    console.log('electronAPI object:', window.electronAPI)
    console.log('setOpacity available:', !!window.electronAPI?.setOpacity)
    console.log('closeWindow available:', !!window.electronAPI?.closeWindow)

    if (window.electronAPI) {
      window.electronAPI.setOpacity(1.0)
    }
  }, [])

  const handleOpacityChange = (value: number) => {
    setOpacity(value)
    // Use Electron window opacity when available (preferred method)
    if (window.electronAPI) {
      window.electronAPI.setOpacity(value / 100)
    }
    // CSS opacity is only used as fallback when Electron API is not available
  }

  const handleClose = () => {
    // Try to close via Electron API
    if (window.electronAPI?.closeWindow) {
      window.electronAPI.closeWindow()
    } else {
      // Fallback: hide the window by setting opacity to 0
      setOpacity(0)
      if (window.electronAPI?.setOpacity) {
        window.electronAPI.setOpacity(0)
      }
    }
  }

  return (
    <div
      className="h-screen w-screen p-2 transition-opacity duration-200"
      style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        // Only apply CSS opacity if Electron API is not available (browser preview mode)
        opacity: window.electronAPI ? 1 : opacity / 100
      }}
    >
      <div className="bg-gradient-to-br from-white to-amber-50/50 rounded-xl shadow-lg border border-emerald-400/40 h-full flex flex-col overflow-hidden">
        {/* Compact header - drag handle */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-2 cursor-move flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <h1 className="text-white text-xs font-bold">Interview Assistant</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white text-[10px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">{opacity}%</span>
            <button
              onClick={handleClose}
              className="w-5 h-5 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full transition-all transform hover:scale-110 active:scale-95 shadow-lg"
              style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
              title="Close Interview Assistant"
            >
              <span className="text-xs font-bold leading-none">✕</span>
            </button>
          </div>
        </div>

        {/* Hint area - compact */}
        <div className="flex-1 p-3">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-emerald-300/40 rounded-lg p-3 h-full overflow-y-auto">
            <p className="text-gray-800 text-xs leading-relaxed">
              {hint}
            </p>
          </div>
        </div>

        {/* Compact controls */}
        <div className="p-3 pt-0 space-y-2" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
          {/* Buttons row */}
          <div className="flex gap-2">
            <button
              onClick={() => setHint('Sample hint: Start by explaining the core concept, then provide examples to demonstrate your understanding.')}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all"
            >
              Test
            </button>
            <button
              onClick={() => setHint('Waiting for question...')}
              className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-[11px] font-bold transition-all"
            >
              Clear
            </button>
          </div>

          {/* Visibility slider - compact */}
          <div className="bg-emerald-50/50 rounded-lg p-2 border border-emerald-200/30">
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="opacity-slider" className="text-gray-700 text-[10px] font-semibold">Visibility</label>
              <span className="px-2 py-0.5 bg-emerald-500 text-white text-[9px] font-bold rounded-full">
                {opacity <= 15 ? 'Hidden' : opacity < 70 ? 'Low' : 'Visible'}
              </span>
            </div>
            <input
              id="opacity-slider"
              type="range"
              min="15"
              max="100"
              value={opacity}
              onChange={(e) => handleOpacityChange(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer accent-emerald-500"
              aria-label="Adjust window visibility"
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${opacity}%, #e5e7eb ${opacity}%, #e5e7eb 100%)`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverlayApp
