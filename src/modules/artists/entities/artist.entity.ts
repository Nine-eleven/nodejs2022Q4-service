export class Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;

  constructor(trackData: Artist) {
    Object.entries(trackData).forEach(([key, value]) => {
      this[key] = value;
    });
  }
}
