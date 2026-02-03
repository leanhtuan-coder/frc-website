import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRefCode(prefix: string = "FRC"): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let code = prefix + "-"
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export function hashIp(ip: string): string {
  // Simple hash for rate limiting (not cryptographically secure, but sufficient for rate limiting)
  let hash = 0
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36)
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function validatePhone(phone: string): boolean {
  // Vietnamese phone number validation (10-11 digits, may start with 0 or +84)
  const cleaned = phone.replace(/[\s\-\(\)]/g, '')
  return /^(\+84|0)[1-9][0-9]{8,9}$/.test(cleaned)
}

