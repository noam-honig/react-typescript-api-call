import { BackendMethod, Remult, Entity, Field, IdEntity } from "remult";

@Entity('tutorials', {
  allowApiCrud: true
})
export default class ITutorialData extends IdEntity {
  @Field()
  title: string = '';
  @Field()
  description: string = '';
  @Field()
  published?: boolean = false;
  @BackendMethod({ allowed: true })
  static async removeAll(remult?: Remult) {
    for await (const tutorial of remult!.repo(ITutorialData).iterate()) {
      await tutorial.delete();
    }
  }
}