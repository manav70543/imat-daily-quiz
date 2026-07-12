import Navbar from "../components/Navbar";

export default function History() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Quiz History</h1>
        <p>Your previous quiz attempts will appear here.</p>
      </div>
    </>
  );
}