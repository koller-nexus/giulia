export interface Photo {
  src: string
  alt: string
  caption?: string
}

export const photos: Photo[] = [
  {
    src: '/photos/1.jpeg',
    alt: 'Giulia — photo one',
  },
  {
    src: '/photos/2.jpeg',
    alt: 'Giulia — photo two',
  },
  {
    src: '/photos/3.jpeg',
    alt: 'Giulia — photo three',
  },
  {
    src: '/photos/4.jpeg',
    alt: 'Giulia — photo four',
  },
  {
    src: '/photos/5.jpeg',
    alt: 'Giulia — photo five',
  },
  {
    src: '/photos/6.jpeg',
    alt: 'Giulia — photo six',
  },
]

export const MET_ON = '2024-10-28T00:00:00'
export const TWO_YEAR_ON = '2026-10-28T00:00:00'