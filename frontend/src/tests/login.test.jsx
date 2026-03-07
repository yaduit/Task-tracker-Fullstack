import { render, screen } from "@testing-library/react"
import Login from "../pages/login.jsx"
import { BrowserRouter } from "react-router-dom"

test("renders login form", () => {

  render(
    <BrowserRouter>
      <Login/>
    </BrowserRouter>
  )

  expect(screen.getByText(/login/i)).toBeInTheDocument()

})