'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Post.belongsTo(models.User, { foreignKey: {allowNull: true}})
      models.Post.hasMany(models.CommentPost)
    }
  };
  Post.init({
    comment: DataTypes.TEXT,
    file: DataTypes.STRING,
    gifs: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};