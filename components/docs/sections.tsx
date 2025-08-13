import { gettingStartedSections } from "./sections/getting-started"
import { guideSections } from "./sections/guides"
import { proSections } from "./sections/pro"
import { integrationSections } from "./sections/integrations"
import { referenceSections } from "./sections/reference"
import { policySections } from "./sections/policies"
import { releases } from "./releases"

export const docSections = [
  ...gettingStartedSections,
  ...guideSections,
  ...proSections,
  ...integrationSections,
  ...referenceSections,
  ...policySections,
  ...releases,
] as const

