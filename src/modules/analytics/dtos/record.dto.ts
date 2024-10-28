export class Record {
  West: number;
  North: number;
  East: number;
  South: number;
  Kigali: number;
  constructor(
    west: number,
    east: number,
    south: number,
    north: number,
    kigali: number,
  ) {
    this.West = west;
    this.East = east;
    this.South = south;
    this.North = north;
    this.Kigali = kigali;
  }
}
