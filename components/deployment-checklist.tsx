"use client"

import { useState } from "react"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface ChecklistItem {
  id: string
  title: string
  description: string
  status: "pending" | "pass" | "fail" | "warning"
  action?: string
}

export function DeploymentChecklist() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    {
      id: "file-exists",
      title: "Logo file exists locally",
      description: "Verify kalender-logo.png exists in your public/ directory",
      status: "pending",
      action: "Check your local public/ folder",
    },
    {
      id: "file-name",
      title: "Correct filename case",
      description: 'File must be named exactly "kalender-logo.png" (all lowercase)',
      status: "pending",
      action: "Rename file if necessary",
    },
    {
      id: "git-tracked",
      title: "File is tracked by Git",
      description: "Ensure the logo file is committed to your repository",
      status: "pending",
      action: "Run: git add public/kalender-logo.png && git commit",
    },
    {
      id: "vercel-build",
      title: "Vercel build includes file",
      description: "Check if file appears in Vercel deployment logs",
      status: "pending",
      action: "Review Vercel deployment logs",
    },
    {
      id: "direct-access",
      title: "Direct URL access works",
      description: "Test if yoursite.com/kalender-logo.png loads",
      status: "pending",
      action: "Visit the direct URL in browser",
    },
  ])

  const updateStatus = (id: string, status: ChecklistItem["status"]) => {
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)))
  }

  const getStatusIcon = (status: ChecklistItem["status"]) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "fail":
        return <XCircle className="w-5 h-5 text-red-600" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      default:
        return <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
    }
  }

  return (
    <div className="p-6 border rounded-lg space-y-4">
      <h2 className="text-xl font-semibold">Deployment Checklist</h2>

      <div className="space-y-3">
        {checklist.map((item) => (
          <div key={item.id} className="flex items-start gap-3 p-3 border rounded">
            {getStatusIcon(item.status)}
            <div className="flex-1">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              {item.action && <p className="text-xs text-blue-600 mt-1">Action: {item.action}</p>}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(item.id, "pass")}
                className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
              >
                Pass
              </button>
              <button
                onClick={() => updateStatus(item.id, "fail")}
                className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                Fail
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 p-4 rounded">
        <h3 className="font-medium text-yellow-800 mb-2">Common Vercel Issues & Solutions</h3>
        <div className="text-sm text-yellow-700 space-y-2">
          <div>
            <strong>Issue:</strong> File exists locally but not on Vercel
          </div>
          <div>
            <strong>Solution:</strong> Ensure file is committed to Git and pushed to your repository
          </div>

          <div className="mt-3">
            <strong>Issue:</strong> Case sensitivity problems
          </div>
          <div>
            <strong>Solution:</strong> Rename file to exact lowercase: "kalender-logo.png"
          </div>

          <div className="mt-3">
            <strong>Issue:</strong> Build cache issues
          </div>
          <div>
            <strong>Solution:</strong> Clear Vercel cache: Settings → Functions → Clear Cache
          </div>
        </div>
      </div>
    </div>
  )
}
