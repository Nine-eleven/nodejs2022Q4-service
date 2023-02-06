export class Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist

  constructor(userData: Album) {
    Object.entries(userData).forEach(([key, value]) => {
      this[key] = value;
    });
  }
}
