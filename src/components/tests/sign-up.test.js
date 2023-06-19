import React from "react";
import { fireEvent, render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Signup from "../sign-up";
// import userEvent from "@testing-library/user-event";

const isAuthenticated = false;

const handleSubmit = jest.fn();

// calls handleSubmit
// submission success

describe("conditional rendering", () => {
    it("displays form if not logged in", () => {
        render(<Signup isAuthenticated={isAuthenticated} />);

        expect(screen.getByRole("heading")).toHaveTextContent("Sign up form");
    });

    it("displays already logged in message when logged in", () => {
        render(<Signup isAuthenticated={true} />)

        expect(screen.getByRole("heading")).toHaveTextContent("Already logged in!");
    });
});

describe("input values and validation", () => {

    it("values of input changes with user input", async () => {
        // const user = userEvent.setup();

        render(<Signup isAuthenticated={isAuthenticated} />);
        await act(async () => {
            const nameInput = screen.getByTestId("username");
            const passwrdInput = screen.getByTestId("password");
            const emailInput = screen.getByTestId("email");
            const codeInput = screen.getByTestId("code");

            fireEvent.change(nameInput, { target: { value: "Bob" } });
            fireEvent.change(passwrdInput, { target: { value: "secret123" } });
            fireEvent.change(emailInput, { target: { value: "bob@gooogle" } });
            fireEvent.change(codeInput, { target: { value: "789" } });
        });

        expect(screen.getByTestId("username")).toHaveValue("Bob");
        expect(screen.getByTestId("password")).toHaveValue("secret123");
        expect(screen.getByTestId("email")).toHaveValue("bob@gooogle");
        expect(screen.getByTestId("code")).toHaveValue("789");

    });

});

// describe("submitting form", () => {
//     it("calls handleSubmit", () => {
//         render(<Signup isAuthenticated={isAuthenticated} />);

//         fireEvent.click(screen.getByTestId("submit-btn"));

//         expect(handleSubmit).toHaveBeenCalled();
//     });
// });