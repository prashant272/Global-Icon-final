import axios from "axios";

// existing ...
// export const fetchAdminNominations = ...

// Add to the bottom of api.js:

export const fetchPreviousEditions = async () => {
    const { data } = await axios.get("/api/previous-editions");
    return data;
};

export const fetchEditionByYear = async (year) => {
    const { data } = await axios.get(`/api/previous-editions/${year}`);
    return data;
};

export const createPreviousEdition = async (formData, token) => {
    const { data } = await axios.post("/api/previous-editions", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
};

export const updatePreviousEdition = async (id, formData, token) => {
    const { data } = await axios.put(`/api/previous-editions/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
};

export const deletePreviousEdition = async (id, token) => {
    const { data } = await axios.delete(`/api/previous-editions/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};
