import { Entity, PrimaryColumn, BaseEntity, Column } from "typeorm"

@Entity("linking_request")
export default class LinkingRequest extends BaseEntity {
    @PrimaryColumn("text")
    public code!: string

    @Column("bigint", { name: "user_id" })
    public userId!: string

    @Column("timestamp", { name: "expiration", default: () => "(now() + '5 minutes'::interval)" })
    public expiration!: Date

    isExpired() {
        return new Date() >= this.expiration
    }
}
