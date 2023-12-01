// tests/CreateTaskModal.test.js
import React from "react";
import renderer from "react-test-renderer";
import CreateTaskModal from "../../src/components/CreateTaskModal";

describe("CreateTaskModal", () => {
  it("renders correctly when open", () => {
    const mockOnSubmit = jest.fn();
    const mockOnClose = jest.fn();
    const tree = renderer
      .create(
        <CreateTaskModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("does not render when not open", () => {
    const mockOnSubmit = jest.fn();
    const mockOnClose = jest.fn();
    const tree = renderer
      .create(
        <CreateTaskModal
          isOpen={false}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
