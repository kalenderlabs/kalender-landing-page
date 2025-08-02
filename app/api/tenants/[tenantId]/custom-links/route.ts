import { type NextRequest, NextResponse } from "next/server"
import type { CustomLink } from "@/lib/custom-links"

// Mock database - replace with actual database operations
const mockLinks: CustomLink[] = []

export async function GET(request: NextRequest, { params }: { params: { tenantId: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    let filteredLinks = mockLinks.filter((link) => link.tenantId === params.tenantId)

    if (type) {
      filteredLinks = filteredLinks.filter((link) => link.type === type)
    }

    if (status) {
      filteredLinks = filteredLinks.filter((link) => link.status === status)
    }

    if (search) {
      filteredLinks = filteredLinks.filter(
        (link) =>
          link.name.toLowerCase().includes(search.toLowerCase()) ||
          link.slug.toLowerCase().includes(search.toLowerCase()),
      )
    }

    return NextResponse.json(filteredLinks)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch links" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { tenantId: string } }) {
  try {
    const body = await request.json()

    const newLink: CustomLink = {
      id: `link_${Date.now()}`,
      tenantId: params.tenantId,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "current-user-id", // Replace with actual user ID
      ...body,
    }

    mockLinks.push(newLink)

    return NextResponse.json(newLink, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create link" }, { status: 500 })
  }
}
