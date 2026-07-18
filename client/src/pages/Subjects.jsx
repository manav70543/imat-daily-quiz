import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { getSubjects } from "../services/subjectService";

import "../styles/adminSubjects.css";

export default function Subjects() {

    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        loadSubjects();
    }, []);

    const loadSubjects = async () => {

        try {

            const data = await getSubjects();

            setSubjects(data.subjects);

        } catch (err) {

            console.error(err);

        }

    };

    return (
        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-content">

                <h1>Subjects</h1>

                <div className="table-container">

                    <table className="students-table">

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>Subject Name</th>

                            </tr>

                        </thead>

                        <tbody>

                            {subjects.map((subject) => (

                                <tr key={subject.id}>

                                    <td>{subject.id}</td>

                                    <td>{subject.name}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}