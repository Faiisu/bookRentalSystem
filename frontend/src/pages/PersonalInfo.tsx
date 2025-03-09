import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircleIcon, LogOutIcon, SaveIcon, CalendarIcon, EditIcon, Edit } from "lucide-react";
import editIcon from '../assets/PersonalInfo/editIcon.png';
import { updateMember } from "../api";

import { handleLogout } from "../auth";

const PersonalInfo = () => {
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [username, setUserName] = useState(localStorage.getItem("username"));
    const [firstName, setFirstname] = useState(localStorage.getItem("firstName"));
    const [lastName, setLastname] = useState(localStorage.getItem("lastName"));
    const point = localStorage.getItem("point");
    const [member_rank, setMemberRank] = useState(localStorage.getItem("member_rank"));
    const [birthday, setBirthday] = useState(localStorage.getItem("birthday"));
    const [editProfile, setEditprofile] = useState(false);
    const navigate = useNavigate();

    const [bufferUsername, setBufferUsername] = useState("");
    const [bufferFirstname, setBufferFirstName] = useState("");
    const [bufferLastname, setBufferLastName] = useState("");
    const [bufferBirth, setBufferBirth] = useState("");

    const handleSave = async () => {
        // Build update object with only the fields that have new values
        const updateData = {
            username: bufferUsername === "" ? (username ?? "") : bufferUsername,
            firstName: bufferFirstname === "" ? (firstName ?? "") : bufferFirstname,
            lastName: bufferLastname === "" ? (lastName ?? "") : bufferLastname,
            birthday: bufferBirth === "" ? (birthday ?? "") : bufferBirth,
        };
        try {
          // Call API endpoint to update the member in MySQL
          // Assumes that 'email' holds the current user's email
          if(email!==null){
            await updateMember(email, updateData);
          }
      
          // Update local state and localStorage if API update was successful
          if (bufferUsername !== "") {
            setUserName(bufferUsername);
            localStorage.setItem("username", bufferUsername);
          }
          if (bufferFirstname !== "") {
            setFirstname(bufferFirstname);
            localStorage.setItem("firstName", bufferFirstname);
          }
          if (bufferLastname !== "") {
            setLastname(bufferLastname);
            localStorage.setItem("lastName", bufferLastname);
          }
          if (bufferBirth !== "") {
            setBirthday(bufferBirth);
            localStorage.setItem("birthday", bufferBirth);
          }
        } catch (error) {
          console.error("Error updating member in MySQL:", error);
        } finally {
          // Close edit mode regardless of the update result
          setEditprofile(false);
        }
      };

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
                                {birthday}                          
                            </div>                

                            <div className="mt-2 flex">
                                <label className="mr-2 font-bold">Point:</label>
                                {point}
                            </div>
                        </div>

                    </div> :
                    // edit Profile == true
                    <div className=" relative">
                        <div className="flex flex-col items-center mb-4">
                            <UserCircleIcon className="w-20 h-20 text-gray-400" />
                            <input 
                                value = {bufferUsername}
                                onChange={ (e) => setBufferUsername(e.target.value) }
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
                                        value={bufferFirstname}
                                        onChange={(e) => setBufferFirstName(e.target.value)}
                                        className="bg-white p-1 text-black border border-gray-300 rounded mt-1 w-full"
                                        placeholder={firstName?firstName:""}
                                    />
                                </div>
                                <div className="m-0 pl-1">
                                    <input
                                        value={bufferLastname}
                                        onChange={(e) => setBufferLastName(e.target.value)}
                                        className="bg-white p-1 text-black border border-gray-300 rounded mt-1 w-full"
                                        placeholder={lastName?lastName:""}                                      
                                    />
                                </div>                             
                            </div>
            
                            <div className="mt-2 font-bold">Birthday</div>
                            <div className="max-w-[100%]">
                                <input 
                                    type="date" 
                                    value={bufferBirth} 
                                    onChange={(e) => setBufferBirth(e.target.value)}
                                    className="bg-white p-1 text-gray-500 border border-gray-300 rounded mt-1 w-full"                                    
                                />                                
                            </div>
            
                            <div className="mt-2 flex">
                                <label className="mr-2 font-bold">Point:</label>
                                {point}
                            </div>
                        </div>

                        <div className="flex mt-5 gap-2">                        
                            <button
                                type="button"
                                className="w-100 py-2 rounded-lg bg-blue-500 text-white font-medium text-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition"
                                onClick={handleSave}
                            >
                                <SaveIcon className="w-5 h-5" /> SAVE
                            </button>
                            <button
                                type="button"
                                className="w-100 py-2 rounded-lg bg-red-500 text-white font-medium text-lg flex items-center justify-center gap-2 hover:bg-red-600 transition"
                                onClick={()=>setEditprofile(false)}
                            >
                                CANCLE
                            </button>          
                        </div>                      
                    </div>
                }                      
            </div>
        </div>
    );
};

export default PersonalInfo;       