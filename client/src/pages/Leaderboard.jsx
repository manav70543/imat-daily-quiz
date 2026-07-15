import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getLeaderboard } from "../services/leaderboardService";

export default function Leaderboard() {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const data = await getLeaderboard();

            console.log(data);

            setLeaders(data.leaderboard || []);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Navbar />

            <div style={{ padding: "30px" }}>
                <h1>Leaderboard</h1>

                <table
                    border="1"
                    cellPadding="10"
                    width="100%"
                    style={{ marginTop: "20px" }}
                >
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>

                    <tbody>
                        {leaders.map((student, index) => (
                            <tr key={student.id}>
                                <td>{index + 1}</td>
                                <td>{student.name}</td>
                                <td>{student.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}