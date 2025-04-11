import tw, { styled } from "twin.macro";
import Home from "@/pages/Home";
import InGame from "@/pages/InGame";
import "./App.css";
import AppScreen from "./containers/AppScreen";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Container = styled.div`
  ${tw`w-screen h-screen bg-[#3c3c3c] flex justify-center items-center`}
`;

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/game",
      element: <InGame />,
    },
  ]);

  return (
    <Container>
      <AppScreen>
        <RouterProvider router={router} />
      </AppScreen>
    </Container>
  );
}

export default App;
