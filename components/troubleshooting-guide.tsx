"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

interface TroubleshootingStep {
  title: string
  description: string
  commands?: string[]
  details: string[]
}

const troubleshootingSteps: TroubleshootingStep[] = [
  {
    title: "1. Verify Local File Structure",
    description: "Ensure the logo file exists in the correct location",
    commands: ["ls -la public/kalender-logo.png", "file public/kalender-logo.png"],
    details: [
      "File must be exactly named 'kalender-logo.png' (all lowercase)",
      "File must be in the public/ directory at project root",
      "File should be a valid PNG image",
      "Recommended size: under 100KB for optimal loading",
    ],
  },
  {
    title: "2. Check Git Repository Status",
    description: "Verify the file is committed and pushed to your repository",
    commands: [
      "git status",
      "git ls-files public/kalender-logo.png",
      "git add public/kalender-logo.png",
      "git commit -m 'Add kalender logo'",
      "git push",
    ],
    details: [
      "File must be tracked by Git to be included in deployment",
      "Check if file is in .gitignore (it shouldn't be)",
      "Ensure file is pushed to the branch Vercel deploys from",
      "Large files (>100MB) may be rejected by Git",
    ],
  },
  {
    title: "3. Verify Vercel Deployment",
    description: "Check Vercel deployment logs and settings",
    details: [
      "Go to Vercel Dashboard → Your Project → Deployments",
      "Click on latest deployment → View Function Logs",
      "Look for any errors related to static files",
      "Check if build completed successfully",
      "Verify deployment is from correct Git branch",
    ],
  },
  {
    title: "4. Test Direct File Access",
    description: "Verify the file is accessible via direct URL",
    details: [
      "Visit: https://yoursite.com/kalender-logo.png",
      "Should return the image file, not a 404 error",
      "Check browser Network tab for exact error codes",
      "Try both HTTP and HTTPS versions",
      "Test from different devices/networks",
    ],
  },
  {
    title: "5. Clear Caches and Redeploy",
    description: "Clear various caches that might be causing issues",
    details: [
      "Vercel Dashboard → Settings → Functions → Clear Cache",
      "Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)",
      "Try incognito/private browsing mode",
      "Redeploy from Vercel dashboard",
      "Wait 5-10 minutes for global CDN propagation",
    ],
  },
  {
    title: "6. Check Next.js Configuration",
    description: "Verify Next.js is configured to handle static files properly",
    details: [
      "Ensure next.config.mjs doesn't exclude static files",
      "Check if custom webpack config affects static assets",
      "Verify image optimization settings",
      "Consider disabling image optimization temporarily",
    ],
  },
]

export function TroubleshootingGuide() {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([])

  const toggleStep = (index: number) => {
    setExpandedSteps((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white border rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Logo Deployment Troubleshooting Guide</h1>
        <p className="text-gray-600 mb-6">
          Follow these steps systematically to resolve logo display issues between local and Vercel environments.
        </p>

        <div className="space-y-4">
          {troubleshootingSteps.map((step, index) => (
            <div key={index} className="border rounded-lg">
              <button
                onClick={() => toggleStep(index)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
              >
                <h3 className="font-semibold">{step.title}</h3>
                {expandedSteps.includes(index) ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>

              {expandedSteps.includes(index) && (
                <div className="px-4 pb-4 border-t bg-gray-50">
                  <p className="text-gray-700 mb-3">{step.description}</p>

                  {step.commands && (
                    <div className="mb-3">
                      <h4 className="font-medium mb-2">Commands to run:</h4>
                      <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm space-y-1">
                        {step.commands.map((command, cmdIndex) => (
                          <div key={cmdIndex}>$ {command}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium mb-2">Details:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Quick Diagnosis</h3>
          <p className="text-blue-700 text-sm mb-2">Most logo deployment issues fall into these categories:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-blue-800">Local works, Vercel doesn't:</strong>
              <ul className="list-disc list-inside text-blue-700 mt-1">
                <li>File not committed to Git</li>
                <li>Case sensitivity issue</li>
                <li>Build process problem</li>
              </ul>
            </div>
            <div>
              <strong className="text-blue-800">Neither works:</strong>
              <ul className="list-disc list-inside text-blue-700 mt-1">
                <li>File doesn't exist</li>
                <li>Wrong file path</li>
                <li>Corrupted image file</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
