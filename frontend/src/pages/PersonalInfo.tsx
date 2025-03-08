import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircleIcon, LogOutIcon, SaveIcon, CalendarIcon } from "lucide-react";
import editIcon from '../assets/PersonalInfo/editIcon.png';

import { handleLogout } from "../auth";

const PersonalInfo = () => {
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [username, setName] = useState(localStorage.getItem("username"));
    const [firstName, setFirstname] = useState(localStorage.getItem("firstName"));
    const [lastName, setLastname] = useState(localStorage.getItem("lastName"));
    const [point, setPoint] = useState(localStorage.getItem("point"));
    const [member_rank, setMemberRank] = useState(localStorage.getItem("member_rank"));
    const [birthday, setBirthday] = useState(localStorage.getItem("birthday"));
    const [editProfile, setEditprofile] = useState(false);
    const navigate = useNavigate();

    const handleSave = () =>{
        setEditprofile(false);
    }

    return (
        <div className="flex justify-center w-[100vw] min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
            <div className="mt-20 h-125 bg-white p-8 rounded-2xl shadow-2xl w-[22rem] text-center relative">
                <button 
                    className="w-5 h-5 opacity-20 hover:opacity-100 absolute right-4 top-4 transition-all duration-300 outline-none focus:outline-none"
                    onClick={() => { setEditprofile(true) }} 
                    style={{
                        backgroundImage: `url(${editIcon})`, 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                </button>
                
                {editProfile==false?
                    // avata & name
                    <div>
                        <div className="flex flex-col items-center mb-4">
                            <UserCircleIcon className="w-20 h-20 text-gray-400" />
                            <h2 className="text-xl font-semibold mt-2 text-gray-700">{username || "Username"}</h2>
                            <p className="text-gray-500 text-sm">{email || "email@example.com"}</p>
                        </div>
                        
                        {/* Divider */}
                        <hr className="my-4 border-gray-200" />
                        <div className="text-left">                   
                            <div className="flex">
                                <label className="mr-2 font-bold">Rank:</label>
                                <div>{member_rank}</div>
                            </div>

                            <div className="mt-2 font-bold">Full Name</div>
                            <div className="grid grid-cols-2 max-w-[100%]">
                                <label className="block text-gray-700">{firstName}</label>                            
                                <label className="block text-gray-700">{lastName}</label>                                
                            </div>

                            <div className="mt-2 font-bold">BirthDay</div>
                            <div className="max-w-[100%]">
                                I will put birthday later i'm so tried                            
                            </div>                

                            <div className="mt-2 flex">
                                <label className="mr-2 font-bold">Point:</label>
                                {point}
                            </div>
                        </div>

                    </div> :
                    // edit Profile == true
                    <div>
                        <div className="flex flex-col items-center mb-4">
                            <UserCircleIcon className="w-20 h-20 text-gray-400" />
                            <input 
                                className="text-center p-1 relative z-10 bg-white text-black w-50 border border-gray-300 rounded mt-1"
                                placeholder={username || ""} 
                            />
                            <p className="text-gray-500 text-sm">{email || "email@example.com"}</p>
                        </div>
                        
                        {/* Divider */}
                        <hr className="my-4 border-gray-200" />
                        <div className="text-left">                   
                            <div className="flex">
                                <label className="mr-2 font-bold">Rank:</label>
                                <div>{member_rank}</div>
                            </div>
            
                            <div className="mt-2 font-bold">Full Name</div>
                            <div className="grid grid-cols-2 max-w-[100%]">
                                <div className="m-0 pr-1">
                                    <input  
                                        // value={firstNameState}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        className="bg-white p-1 text-black border border-gray-300 rounded mt-1 w-full"
                                        placeholder="First Name"
                                    />
                                </div>
                                <div className="m-0 pl-1">
                                    <input  
                                        // value={lastNameState}
                                        onChange={(e) => setLastname(e.target.value)}
                                        className="bg-white p-1 text-black border border-gray-300 rounded mt-1 w-full"
                                        placeholder="Last Name"                                        
                                    />
                                </div>                             
                            </div>
            
                            <div className="mt-2 font-bold">Birthday</div>
                            <div className="max-w-[100%]">
                                <input 
                                    type="date" 
                                    // value={birthday} 
                                    onChange={(e) => setBirthday(e.target.value)}
                                    className="bg-white p-1 text-gray-500 border border-gray-300 rounded mt-1 w-full"                                    
                                />                                
                            </div>
            
                            <div className="mt-2 flex">
                                <label className="mr-2 font-bold">Point:</label>
                                {point}
                            </div>
                        </div>
            
                        <button
                            type="button"
                            className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-0 w-[80%] py-2 rounded-lg bg-blue-500 text-white font-medium text-lg flex items-center justify-center gap-2 hover:bg-green-600 transition"
                            onClick={handleSave}
                        >
                            <SaveIcon className="w-5 h-5" /> SAVE
                        </button>                                
                    </div>
                }
                 {/* Divider */}
                 <hr className="my-4 border-gray-200" />                         
            </div>
        </div>
    );
};

export default PersonalInfo;       