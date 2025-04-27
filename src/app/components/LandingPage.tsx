import React from 'react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 bg-blue-50 dark:bg-blue-900/30 rounded-full">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Developer Template</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            LUKSO Mini-App Starter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            A powerful development environment for building mini-apps that seamlessly integrate with Universal Everything.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://github.com/Deliquified/mini-app-starter"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Get Started
            </a>
            <a
              href="https://fnce-foundation.notion.site/Hack-The-Grid-18c8d1c8a2118073b928dc8de54e5e1a"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Mini-App Notion
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Everything you need to build amazing mini-apps
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                UP Provider Integration
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pre-configured Universal Profile provider setup for seamless wallet integration.
              </p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Profile Management
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built-in components for fetching and managing Universal Profile data.
              </p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Modern Stack
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built with TypeScript, React, and Tailwind CSS for a modern development experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Quick Start Guide
          </h2>
          <div className="space-y-6">
            <div className="flex items-start p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold mr-4">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Clone and Install
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Clone this repository and install dependencies using your preferred package manager.
                </p>
              </div>
            </div>
            <div className="flex items-start p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold mr-4">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Development Server
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Start the development server with npm run dev and begin building your mini-app.
                </p>
              </div>
            </div>
            <div className="flex items-start p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold mr-4">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Build Your App
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Use the provided components and hooks to build your mini-app functionality.
                </p>
              </div>
            </div>
            <div className="flex items-start p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold mr-4">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Test and Deploy
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Test your mini-app by embedding it in Universal Everything and deploy when ready.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to build your mini-app?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get started with the LUKSO Mini-App Starter template today.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://universaleverything.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Visit Universal Everything
            </a>
            <a
              href="https://docs.lukso.tech/tools/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-white text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Read the Docs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};