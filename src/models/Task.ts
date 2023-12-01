import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import {User} from './index';

// These are all the attributes in the Task model
interface TaskAttributes {
  id: number;
  title: string;
  description: string;
  status: string;
  assigneeId?: number;
}

// Some fields are optional when creating a Task
interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: string;
  public assigneeId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof Task {
  Task.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      description: {
        type: new DataTypes.STRING(500),
        allowNull: true,
      },
      status: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        defaultValue: 'To Do'
      },
      assigneeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
    },
    {
      tableName: 'tasks',
      sequelize,
    }
  );

  // Task.belongsTo(User, { foreignKey: 'assigneeId', as: 'assignee' });

  return Task;
}
