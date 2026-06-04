import { useState, useEffect } from 'react'

interface ReleaseAsset {
  name: string
  browser_download_url: string
}

interface DownloadUrls {
  macIntel: string | null
  macArm: string | null
  windows: string | null
}

function LandingPage() {
  const GITHUB_REPO = 'RahulSP-4601/Interview-Assistant-FE'
  const [downloadUrls, setDownloadUrls] = useState<DownloadUrls>({
    macIntel: null,
    macArm: null,
    windows: null
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLatestRelease = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`)

        if (!response.ok) {
          throw new Error('Failed to fetch latest release')
        }

        const data = await response.json()
        const assets: ReleaseAsset[] = data.assets ?? []

        // Find download URLs for each platform
        const urls: DownloadUrls = {
          macIntel: assets.find(asset => asset.name.endsWith('.dmg') && !asset.name.includes('arm64'))?.browser_download_url || null,
          macArm: assets.find(asset => asset.name.endsWith('.dmg') && asset.name.includes('arm64'))?.browser_download_url || null,
          windows: assets.find(asset => asset.name.endsWith('.exe'))?.browser_download_url || null
        }

        setDownloadUrls(urls)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching release:', err)
        setError('Failed to load download links. Please try again later.')
        setLoading(false)
      }
    }

    fetchLatestRelease()
  }, [])

  const handleMacDownload = async () => {
    if (!downloadUrls.macIntel && !downloadUrls.macArm) {
      alert('Mac download is not available at the moment.')
      return
    }

    // Try to detect Apple Silicon using userAgentData (modern API)
    let isAppleSilicon = false

    try {
      // @ts-expect-error - userAgentData is not yet in all TypeScript definitions
      if (navigator.userAgentData?.getHighEntropyValues) {
        // @ts-expect-error - userAgentData is not yet in all TypeScript definitions
        const ua = await navigator.userAgentData.getHighEntropyValues(['architecture'])
        isAppleSilicon = ua.architecture === 'arm' || ua.architecture === 'arm64'
      }
    } catch {
      // Fallback: just use Intel build or whatever is available
      console.log('Could not detect architecture, using default')
    }

    // Prefer ARM build on Apple Silicon, fallback to Intel or any available
    const downloadUrl = isAppleSilicon && downloadUrls.macArm
      ? downloadUrls.macArm
      : downloadUrls.macIntel || downloadUrls.macArm

    if (downloadUrl) {
      window.location.href = downloadUrl
    }
  }

  const handleWindowsDownload = () => {
    if (!downloadUrls.windows) {
      alert('Windows download is not available at the moment.')
      return
    }
    window.location.href = downloadUrls.windows
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">
            Interview Assistant
          </h1>
          <p className="text-xl text-purple-200">
            Your AI-powered companion for interview preparation
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-center">
            {error}
          </div>
        )}

        {/* Download Buttons */}
        <div className="space-y-6">
          {/* Mac Download Button */}
          <button
            onClick={handleMacDownload}
            disabled={loading || (!downloadUrls.macIntel && !downloadUrls.macArm)}
            className="w-full group bg-white hover:bg-gray-50 text-gray-900 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* Apple Icon */}
                <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">
                    {loading ? 'Loading...' : 'Download for macOS'}
                  </div>
                  <div className="text-base text-gray-600 font-medium mt-1">macOS 10.15 Catalina and newer</div>
                </div>
              </div>
              <div className="text-sm text-gray-400 font-semibold bg-gray-100 px-4 py-2 rounded-lg">
                .dmg
              </div>
            </div>
          </button>

          {/* Windows Download Button */}
          <button
            onClick={handleWindowsDownload}
            disabled={loading || !downloadUrls.windows}
            className="w-full group bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* Windows Icon */}
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5.45v6.55l7-1v-6.8zm7 6.5l11-1.55v-6.4l-11 1.55zm-7 1.05v6.55l7 1v-6.8zm7 .05l11 1.55v6.4l-11-1.55z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">
                    {loading ? 'Loading...' : 'Download for Windows'}
                  </div>
                  <div className="text-base text-blue-100 font-medium mt-1">Windows 10 and Windows 11</div>
                </div>
              </div>
              <div className="text-sm text-blue-100 font-semibold bg-blue-500 px-4 py-2 rounded-lg">
                .exe
              </div>
            </div>
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <a
            href={`https://github.com/${GITHUB_REPO}/releases`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-purple-200 underline text-sm"
          >
            View all releases on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
