// tests/TasksPage.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import TasksPage from "../../src/components/TaskPage";

describe("TasksPage", () => {
  it("renders correctly", () => {
    const component = renderer.create(<TasksPage />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // More tests could be added here
});
