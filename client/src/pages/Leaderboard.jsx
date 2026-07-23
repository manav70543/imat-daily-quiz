import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/LeaderboardService";
import "../styles/leaderboard.css";

export default function Leaderboard() {

    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {

        try {

            const data = await getLeaderboard();

            setLeaders(data.leaderboard || []);

        } catch (err) {

            console.error(err);

        }

    };

    const getMedal = (rank) => {

        if (rank === 1) return "🥇";
        if (rank === 2) return "🥈";
        if (rank === 3) return "🥉";

        return rank;

    };

    return (
        <>
            <div className="leaderboard-container">

                <div className="leaderboard-card">

                    <h1>🏆 Leaderboard</h1>

                    <p>
                        Compete with other students and climb the rankings.
                    </p>

                    <table className="leaderboard-table">

                        <thead>

                            <tr>
                                <th>Rank</th>
                                <th>Student</th>
                                <th>Score</th>
                            </tr>

                        </thead>

                        <tbody>

                            {leaders.length > 0 ? (

                                leaders.map((student, index) => (

                                    <tr key={student.id}>

                                        <td>
                                            {getMedal(index + 1)}
                                        </td>

                                        <td>{student.name}</td>

                                        <td>
                                            <span className="score-badge">
                                                {Number(student.score).toFixed(2)}
                                            </span>
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="3" className="empty">
                                        No leaderboard data available.
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>
        </>
    );
}