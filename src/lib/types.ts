export type Member = {
  id: string;
  name: string;
  average: number;
  highScore: number;
  gamesPlayed?: number;
};

export type GalleryImage = {
  // src가 없으면 PlaceholderImage로 대체 렌더링됩니다.
  src?: string;
  alt: string;
};

export type NavLink = {
  href: string;
  label: string;
};
