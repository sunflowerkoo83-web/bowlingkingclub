export type Member = {
  id: string;
  name: string;
  average: number;
  highScore: number;
  gamesPlayed?: number;
};

export type GalleryImage = {
  id: string;
  url: string;
  alt: string;
};

export type NavLink = {
  href: string;
  label: string;
};
