import API from "../api/axios";

export const getSubjects = async () => {
    const { data } = await API.get("/admin/subjects");
    return data;
};