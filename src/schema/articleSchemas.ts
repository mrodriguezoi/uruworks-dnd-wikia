export interface Article {
  title: string;
  content: ArticleContent;
  slug: string;
}

interface ArticleContent {
  sidebar: SidebarContent;
  mainContentArray: Array<MainContent>;
}

interface SidebarContent {
  imageUrl?: string;
  characterDetails?: CharacterOptions;
  eventDetails?: EventOptions;
  geographyDetails?: GeographyOptions;
  organizationDetails?: OrganizationOptions;
}

export interface CharacterOptions {
  status: string;
  alignment: string;
  race: string;
  relationships?: Array<RelationshipOptions>;
}

interface RelationshipOptions {
  type: string;
  with: string;
}

export interface EventOptions {
  type: string;
  location: string;
  impact: string;
  date: string;
}

export interface GeographyOptions {
  type: string;
  location: string;
}

export interface MainContent {
  title?: string;
  text: string;
}

export interface OrganizationOptions {
  type: string;
  location?: string;
  reach: string;
  status: string;
}
