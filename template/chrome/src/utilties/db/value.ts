import { DAO, db } from "./dao";

export interface Value {
  id: number;
  scriptId: number;
  storageName?: string;
  key: string;
  value: any;
  createtime: number;
  updatetime: number;
}

export class ValueDAO extends DAO<Value> {
  public override tableName = "value";

  constructor() {
    super();
    this.table = db.table(this.tableName);
  }
}
