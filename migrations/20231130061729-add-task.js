"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tasks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        limit: 128,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        limit: 500,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        limit: 128,
        defaultValue: "To Do",
      },
      assigneeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users", // name of the Users table
          key: "id", // key in Users that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tasks");
  },
};
