import { v_1_2_0_beta } from "./1.2.0-beta"

// Export a list of release sections. Add new versions by creating a file and importing here.
export const releases = [v_1_2_0_beta] as const

export function getReleaseIds(): string[] {
  return releases.map((r) => r.id)
}

export function getReleaseById(id: string) {
  return releases.find((r) => r.id === id)
}
