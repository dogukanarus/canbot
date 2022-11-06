import { EntityRepository, Repository } from 'typeorm';
import { PacksDto } from './dto/packs.dto';
import { Packs } from './dto/packs.entity';

@EntityRepository(Packs)
export class BotRepository extends Repository<Packs> {
  async addPack(packsDto: PacksDto) {
    const { title, desc, price } = packsDto;

    // let preSlug = slugify(title, {
    //     replacement: '-', // replace spaces with replacement character, defaults to `-`
    //     remove: undefined, // remove characters that match regex, defaults to `undefined`
    //     lower: true, // convert to lower case, defaults to `false`
    //     strict: false, // strip special characters except replacement, defaults to `false`
    //     locale: 'vi', // language code of the locale to use
    //     trim: true, // trim leading and trailing replacement chars, defaults to `true`
    //   });
    //   let i = 0;
    //   let slug = preSlug;
    //   while (true) {
    //     i++;
    //     const checkSlug = await this.findOne({ slug });
    //     if (checkSlug) {
    //       slug = preSlug;
    //       slug += `-${i}`;
    //     } else {
    //       break;
    //     }
    //   }
    const pack = this.create({
      title,
      desc,
      price,
    });
    await this.save(pack);
    return pack;
  }

  getPacks() {
    const query = this.createQueryBuilder('packs');
    const packs = query.getMany();
    return packs;
  }
}
