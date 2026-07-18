import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

import {
    getStudents,
    searchStudents,
} from "../services/adminService";

import "../styles/adminStudents.css";

export default function Students() {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);

    const limit = 10;

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalStudents: 0,
        limit: 10,
    });

    useEffect(() => {

        if (search.trim() === "") {

            loadStudents(page);

        } else {

            handleSearch(search, page);

        }

    }, [page]);

    const loadStudents = async (currentPage = 1) => {

        setLoading(true);

        try {

            const data = await getStudents(
                currentPage,
                limit
            );

            setStudents(data.students);

            setPagination(data.pagination);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    const handleSearch = async (
        value,
        currentPage = 1
    ) => {

        setSearch(value);

        if (value.trim() === "") {

            loadStudents(1);

            setPage(1);

            return;

        }

        setLoading(true);

        try {

            const data = await searchStudents(
                value,
                currentPage,
                limit
            );

            setStudents(data.students);

            if (data.pagination) {

                setPagination(data.pagination);

            }

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    const changePage = (newPage) => {

        if (
            newPage < 1 ||
            newPage > pagination.totalPages
        ) {
            return;
        }

        setPage(newPage);

    };

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-content">

                <h1>Students</h1>

                <input
                    type="text"
                    className="search-box"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => {

                        setPage(1);

                        handleSearch(
                            e.target.value,
                            1
                        );

                    }}
                />

                <p
                    style={{
                        marginBottom: "15px",
                        color: "#666",
                    }}
                >
                    Showing {students.length} of{" "}
                    {pagination.totalStudents}
                    {" "}students
                </p>

                <div className="table-container">

                    <table className="students-table">

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>Full Name</th>

                                <th>Email</th>

                                <th>XP</th>

                                <th>Level</th>

                                <th>Registered</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="no-data"
                                    >
                                        Loading...
                                    </td>

                                </tr>

                            ) : students.length > 0 ? (

                                students.map((student) => (

                                    <tr key={student.id}>

                                        <td>{student.id}</td>

                                        <td>
                                            {student.full_name}
                                        </td>

                                        <td>
                                            {student.email}
                                        </td>

                                        <td>
                                            {student.xp}
                                        </td>

                                        <td>
                                            {student.level}
                                        </td>

                                        <td>

                                            {new Date(
                                                student.created_at
                                            ).toLocaleDateString()}

                                        </td>

                                        <td>

                                            <button
                                                className="view-btn"
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/students/${student.id}`
                                                    )
                                                }
                                            >
                                                View
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="no-data"
                                    >
                                        No students found.
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                <div className="pagination">

                    <button
                        disabled={page === 1}
                        onClick={() =>
                            changePage(page - 1)
                        }
                    >
                        Previous
                    </button>

                    {Array.from(
                        {
                            length:
                                pagination.totalPages,
                        },
                        (_, i) => (

                            <button
                                key={i + 1}
                                className={
                                    page === i + 1
                                        ? "active-page"
                                        : ""
                                }
                                onClick={() =>
                                    changePage(i + 1)
                                }
                            >
                                {i + 1}
                            </button>

                        )
                    )}

                    <button
                        disabled={
                            page ===
                            pagination.totalPages
                        }
                        onClick={() =>
                            changePage(page + 1)
                        }
                    >
                        Next
                    </button>

                </div>

            </div>

        </div>

    );

}