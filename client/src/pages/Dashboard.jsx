import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Dashboard</h1>

        <h3>Welcome to IMAT Daily Quiz</h3>

        <p>Today's quiz is waiting for you.</p>
      </div>
    </>
  );
}