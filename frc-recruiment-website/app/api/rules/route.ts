import { NextResponse } from "next/server"
import { readFileSync } from "fs"
import { join } from "path"

export async function GET() {
  try {
    const filePath = join(process.cwd(), "content", "rules.md")
    const content = readFileSync(filePath, "utf-8")
    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    })
  } catch (error) {
    return new NextResponse("Nội quy và điều khoản tham gia sẽ được cập nhật sớm.", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    })
  }
}

