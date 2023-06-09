import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fetchUsers, deleteUser } from "../../store/userSlice";
import { UserList } from "./UserList";

const mockStore = configureStore([thunk]);

describe("UserList", () => {
  let store: any;
  let dispatchSpy: jest.Mock;

  beforeEach(() => {
    dispatchSpy = jest.fn();
    store = mockStore({
      user: {
        users: [
          { id: 1, name: "John Doe", email: "johndoe@example.com", username: "johndoe" },
          { id: 2, name: "Jane Smith", email: "janesmith@example.com", username: "janesmith" },
        ],
        loading: false,
        error: null,
      },
    });
    store.dispatch = dispatchSpy;
  });

  it("renders user list correctly", () => {
    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("dispatches fetchUsers action on mount", () => {
    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    expect(dispatchSpy).toHaveBeenCalledWith(fetchUsers());
  });

  it("dispatches deleteUser action when delete button is clicked", () => {
    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    const deleteButton = screen.getAllByText("Delete")[0]; // Get the delete button for the first user
    fireEvent.click(deleteButton);

    expect(dispatchSpy).toHaveBeenCalledWith(deleteUser(1));
  });
});
