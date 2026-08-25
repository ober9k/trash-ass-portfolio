import "@/app.css";
import { useEffect } from "react";

function App() {
  /* test API call to server */
  useEffect(() => {
    fetch("http://localhost:8080/api/hello")
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.error("Unable to query test API endpoint.")
      });
  }, []);

  return (
    <>
      <h1>Hello World</h1>
    </>
  );
}

export default App;
