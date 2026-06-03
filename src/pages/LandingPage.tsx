function LandingPage() {
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

        {/* Download Buttons */}
        <div className="space-y-6">
          {/* Mac Download Button */}
          <button className="w-full group bg-white hover:bg-gray-50 text-gray-900 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* Apple Icon */}
                <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">Download for macOS</div>
                  <div className="text-base text-gray-600 font-medium mt-1">macOS 10.15 Catalina and newer</div>
                </div>
              </div>
              <div className="text-sm text-gray-400 font-semibold bg-gray-100 px-4 py-2 rounded-lg">
                .dmg
              </div>
            </div>
          </button>

          {/* Windows Download Button */}
          <button className="w-full group bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* Windows Icon */}
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5.45v6.55l7-1v-6.8zm7 6.5l11-1.55v-6.4l-11 1.55zm-7 1.05v6.55l7 1v-6.8zm7 .05l11 1.55v6.4l-11-1.55z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">Download for Windows</div>
                  <div className="text-base text-blue-100 font-medium mt-1">Windows 10 and Windows 11</div>
                </div>
              </div>
              <div className="text-sm text-blue-100 font-semibold bg-blue-500 px-4 py-2 rounded-lg">
                .exe
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
