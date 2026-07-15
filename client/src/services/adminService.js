import API from "../api/axios";

export const adminLogin = async (email, password) => {
    const { data } = await API.post("/admin/login", {
        email,
        password
    });

    return data;
};

export const getDashboardStats = async () => {
    const { data } = await API.get("/admin/dashboard");
    return data;
};