import { BackendMethod, Context, Entity, Field, IdEntity } from "remult";

@Entity({
  key: 'tutorials',
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
  static async removeAll(context?: Context) {
    for await (const tutorial of context!.for(ITutorialData).iterate()) {
      await tutorial.delete();
    }
  }
}