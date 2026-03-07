import { render } from "@testing-library/react"
import Dashboard from "../pages/dashboard.jsx"

test("dashboard renders without crashing", () => {

  render(<Dashboard/>)

})