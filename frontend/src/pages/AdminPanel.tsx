import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
    const [employeeData, setEmployeeData] = useState(localStorage.getItem("adminData"));
    const [employeeObj, setEmployeeObj] = useState<string | null>();
    const [name, setName] = useState();
    const navigator = useNavigate();

    if(employeeData){
        setEmployeeObj(JSON.parse(employeeData));
    }

    return (
        <div>
            <div>Admin Panel</div>
            <div>
                {employeeObj?name:""}
            </div>
        </div>
    );
};

export default AdminPanel;