import { Model, QueryInterface, DataTypes } from "sequelize";

interface IMatchers {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatchers>>('matches', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      homeTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'team',
          key: 'id',
        },
      },
      homeTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'team',
          key: 'id',
        },
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      awayTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    })
  },
  down(queryInterface: QueryInterface) {
    return(queryInterface.dropTable('matches'))
  }
}