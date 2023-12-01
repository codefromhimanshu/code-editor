// tests/TaskDetails.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import TaskDetails from "../../src/components/TaskDetails";

const mockTask = {
  id: "1",
  title: "Test Task",
  description: "Test Description",
  status: "To Do",
};

describe("TaskDetails", () => {
  it("renders correctly", () => {
    const component = renderer.create(
      <TaskDetails
        task={mockTask}
        onClose={() => {}}
        onUpdate={() => {}}
        onDelete={() => {}}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // More tests could be added here, such as testing interaction
});
