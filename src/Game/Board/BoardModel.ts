export class Board {
  // SECTION - Static fields
  private static instance: Board | null;
  // !SECTION

  private constructor() {}

  // SECTION - Static methods
  public static getInstance() {
    if (!Board.instance) {
      Board.instance = new Board();
    }

    return Board.instance;
  }
  // !SECTION
}
