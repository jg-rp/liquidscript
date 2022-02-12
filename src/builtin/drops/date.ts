import { liquidDispatch, LiquidDispatchable } from "../../drop";
import { InternalKeyError } from "../../errors";

export class DateDrop implements LiquidDispatchable {
  private date: Date;
  constructor(date?: Date) {
    this.date = date === undefined ? new Date() : date;
  }
  [liquidDispatch](name: string): string {
    switch (name) {
      case "now":
        return this.date.toLocaleString();
      case "today":
        return this.date.toLocaleDateString();
    }
    throw new InternalKeyError(`unknown property ${name}`);
  }
}
