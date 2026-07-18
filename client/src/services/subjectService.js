import API from "../api/axios";

export const getSubjects = async () => {

    const token = localStorage.getItem("adminToken");

    const { data } = await API.get(
        "/admin/subjects",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};