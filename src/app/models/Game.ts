// model of what fields a game component should consist of
// export so i could bring it to other files
export class Game {
  // if a field needs to be optional use ?, exmaple: id?: number;
  id: number;
  price: number;
  title: string;
  description: string;
  tag: string;
}
