'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.CommentPost.belongsTo(models.Post, { foreignKey: {allowNull: true}})
      models.CommentPost.belongsTo(models.User, { foreignKey: {allowNull: true}})
    }
  };
  CommentPost.init({
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CommentPost',
  });
  return CommentPost;
};