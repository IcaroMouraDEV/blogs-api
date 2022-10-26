module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('BlogPost',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      timestamps: false,
      underscored: true, 
      tableName: 'blog_posts'
    },
  );

  Category.associate = (models) => {
    Category.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  return Category;
}