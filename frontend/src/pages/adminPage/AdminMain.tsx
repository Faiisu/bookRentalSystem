import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminMain = () => {
    const adminData = localStorage.getItem("adminData");
    const [employeeData, setEmployeeObj] = useState<object | null>(adminData?JSON.parse(adminData): null);
    const [name, setName] = useState();
    const navigator = useNavigate();

    return (
        <div>main</div>
    );
};

export default AdminMain;