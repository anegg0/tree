import { Model } from 'sequelize';

export class File extends Model {
  public hash?: string;
  public time?: string;
  public exists?: boolean;
  public url?: string;
}
