export type Member = {
  id: string;
  name: string;
  photoUrl?: string;
  experience?: string; // 구력
  average: number; // 에버
  bowlingStyle?: string; // 볼링스타일
  avgBallSpeed?: number; // 평균 구속 (km/h)
  avgRpm?: number; // 평균 RPM
  highScore: number; // 하이점수
  strengths?: string; // 장점
  weaknesses?: string; // 단점
  notes?: string; // 특이사항
  order?: number; // 표시 순서 (관리자가 수동 지정, 없으면 에버리지 내림차순)
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

export type Post = {
  id: string;
  name: string;
  title: string;
  content: string;
  createdAt: string;
};

export type Notice = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};
