import { liquidMethodMissing } from "../../drop";
import { InternalKeyError } from "../../errors";

export class dateDrop {
  private date: Date;
  constructor(date?: Date) {
    this.date = date === undefined ? new Date() : date;
  }
  [liquidMethodMissing](name: string): string {
    switch (name) {
      case "now":
        return this.date.toLocaleString();
      case "today":
        return this.date.toLocaleDateString();
    }
    throw new InternalKeyError(`unknown property ${name}`);
  }
}
