// tests/TaskList.test.js
import React from "react";
import renderer from "react-test-renderer";
import TaskList from "../../src/components/TaskList";

describe("TaskList", () => {
  const mockTasks = [
    {
      id: "1",
      title: "Test Task 1",
      description: "Description 1",
      status: "To Do",
    },
    {
      id: "2",
      title: "Test Task 2",
      description: "Description 2",
      status: "Done",
    },
  ];

  it("renders correctly with tasks", () => {
    const tree = renderer.create(<TaskList tasks={mockTasks} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders no tasks message when empty", () => {
    const tree = renderer.create(<TaskList tasks={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
