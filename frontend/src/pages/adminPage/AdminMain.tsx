import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircleIcon, SaveIcon } from "lucide-react";
import editIcon from '../../assets/PersonalInfo/editIcon.png'

interface EmployeeData {
    name: string,
    position: string,
    salary: string,
    birthday: string,
    email: string,
    phone: string;    
  }

const AdminMain = () => {
    const adminData = localStorage.getItem("adminData");
    const [employeeData, setEmployeeObj] = useState<EmployeeData | null>(adminData?JSON.parse(adminData): null);
    const navigator = useNavigate();
    const [email, setEmail] = useState(employeeData?employeeData.email:"");
    const [username, setName] = useState(employeeData?employeeData.name:"");
    const [firstName, setFirstname] = useState();
    const [lastName, setLastname] = useState();
    const [birthday, setBirthday] = useState(employeeData?employeeData.birthday:"");
    const [position, setPosition] = useState(employeeData?employeeData.position:"");
    const salary = employeeData?employeeData.salary:"";
    const navigate = useNavigate();
 
    return (
        <div className="flex ">
            <div className=" bg-white p-8 pl-20 pr-20 rounded-2xl shadow-2xl w-[700px] text-center relative">                
                <div>                
                    <div className="flex flex-col items-center mb-4">
                        <UserCircleIcon className="w-20 h-20 text-gray-400" />
                        <h2 className="text-xl font-semibold mt-2 text-gray-700">{username || "Username"}</h2>
                        <p className="text-gray-500 text-sm">{email || "email@example.com"}</p>
                    </div>
                    
                    {/* Divider */}
                    <hr className="my-4 border-gray-200" />
                    <div className="text-left">                        
                        <div className="mt-2"><label className=" font-bold">Position: </label>{position}</div>                      
                        <div className="grid grid-cols-2 max-w-[100%]">
                            <label className="block text-gray-700">{firstName}</label>                            
                            <label className="block text-gray-700">{lastName}</label>                                
                        </div>

                        <div className="mt-2 font-bold">BirthDay</div>
                        <div className="max-w-[100%]">
                            {birthday}                
                        </div>                

                    </div>

                </div>
                 {/* Divider */}
                 <hr className="my-4 border-gray-200" />   
                 <div className="mt-2 text-left"><label className=" font-bold">Salary: </label>{salary}</div>                      
            </div>
        </div>
    );
};

export default AdminMain;