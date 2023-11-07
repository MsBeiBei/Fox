import { type Script } from "./scripts";
import { db } from "./dao";

export function migrate() {
  db.version(1).stores({
    scripts:
      "++id,&uuid,name,namespace,author,origin_domain,type,status,createtime,updatetime,checktime",
  });
  db.version(2).stores({
    logger: "++id,level,origin,createtime",
    permission:
      "++id,[scriptId+permission+permissionValue],createtime,updatetime",
  });
  db.version(3).stores({
    logger: "++id,level,title,origin,createtime",
  });
  db.version(4).stores({
    value: "++id,scriptId,namespace,key,createtime",
  });
  db.version(5).stores({
    logger:
      "++id,level,origin,createtime,title,[origin+title],[level+origin+title]",
  });
  db.version(6).stores({
    scripts:
      "++id,&uuid,name,namespace,author,origin_domain,type,status,runStatus,createtime,updatetime,checktime",
  });
  db.version(7).stores({
    resource: "++id,&url,content,type,createtime,updatetime",
    resourceLink: "++id,url,scriptId,createtime",
  });
  db.version(8).stores({
    logger: "++id,level,origin,createtime",
  });
  db.version(9).stores({
    logger: "++id,level,scriptId,origin,createtime",
  });
  db.version(10)
    .stores({
      scripts:
        "++id,&uuid,name,namespace,author,origin_domain,type,sort,status,runStatus,createtime,updatetime,checktime",
    })
    .upgrade((tx) => {
      return tx
        .table("scripts")
        .toCollection()
        .modify((script: Script) => {
          script.sort = 0;
        });
    });
  db.version(11).stores({
    export: "++id,&uuid,scriptId",
  });
  db.version(12)
    .stores({
      value: "++id,scriptId,storageName,key,createtime",
    })
    .upgrade((tx) => {
      tx.table("value")
        .toCollection()
        .modify((value) => {
          if (value.namespace) {
            value.storageName = value.namespace;
            delete value.namespace;
          }
        });
    });
  db.version(13).stores({
    subscribe: "++id,&url,createtime,updatetime,checktime",
    scripts:
      "++id,&uuid,name,namespace,author,origin_domain,subscribeUrl,type,sort,status,runStatus,createtime,updatetime,checktime",
    sync: "++id,&key,[user+device+type],createtime",
  });
  db.version(14).stores({
    value: "++id,[scriptId+key],[storageName+key]",
  });
  db.version(15).stores({
    permission:
      "++id,scriptId,[scriptId+permission+permissionValue],createtime,updatetime",
  });
}
