module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('BlogPost',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      timestamps: false,
      underscored: true, 
      tableName: 'categories'
    },
  );

  Category.associate = (models) => {
    Category.belongsTo(models.User,
      { foreignKey: 'userId', as: 'users' });
  };

  return Category;
}