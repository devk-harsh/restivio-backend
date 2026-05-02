import {
  Attributes,
  CreationAttributes,
  Model,
  ModelStatic,
  WhereOptions,
} from "sequelize";

abstract class BaseRepository<T extends Model> {
  protected model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async findById(id: number): Promise<T | null> {
    const record = await this.model.findByPk(id);
    return record;
  }

  async findAll(): Promise<T[]> {
    const records = await this.model.findAll();
    return records;
  }

  async create(data: CreationAttributes<T>): Promise<T> {
    const record = await this.model.create(data);
    return record;
  }

  async update(id: number, data: Partial<Attributes<T>>): Promise<T | null> {
    const record = await this.model.findByPk(id);

    if (!record) {
      return null;
    }

    await record.update(data);
    return record;
  }

  async delete(whereOptions: WhereOptions<Attributes<T>>): Promise<number> {
    const deletedCount = await this.model.destroy({
      where: whereOptions,
    });

    return deletedCount;
  }
}

export default BaseRepository;