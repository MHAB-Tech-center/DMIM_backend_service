import { SerializeOptions } from "@nestjs/common";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Serializable } from "worker_threads";


@SerializeOptions({
    strategy:"exposeAll"
})
export abstract class TimeStampAudit{
    constructor(){}
    @CreateDateColumn({name:"created_at", default: new Date(Date.now())})
    createdAt: Date;

    @UpdateDateColumn({name:"updated_at", default:null})
    updatedAt: Date;

}