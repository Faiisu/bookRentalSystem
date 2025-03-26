import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../api';
import { TrashIcon } from 'lucide-react';
import { deleteMember } from '../../api';

const ConfirmationModal = ({ show, onConfirm, onCancel }: { show: boolean, onConfirm: () => void, onCancel: () => void }) => {
    if (!show) return null;  // Don't render if modal is hidden

    return (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} className="fixed inset-0 flex justify-center items-center w-[100vw] h-[100vh] z-99">
            <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl mb-4">Are you sure you want to delete this user?</h3>
                <div className="flex justify-between">
                <button onClick={onCancel} className="bg-gray-300 text-black px-4 py-2 rounded">No</button>
                <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">Yes</button>
                </div>
            </div>
        </div>
    );
};

// Define a type for your user
interface User {
  member_id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  birthday: string;
  member_rank: string;
}

const UserManage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [emailToDelete, setEmailToDelete] = useState<string>("");

    useEffect(() => {
    const getUsers = async () => {
        try {
        const data = await fetchUsers();
        setUsers(data.Members);
        } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users.");
        }
    };

    getUsers();
    }, []);

    if (error) return <div>{error}</div>;

    const handleDelete = (e: string) => {
        setEmailToDelete(e);  // Set email to delete
        setShowModal(true);    // Show confirmation modal
    };

    const handleConfirmDelete = () => {
        deleteMember(emailToDelete);
        window.location.reload();  // Reload after deletion
        setShowModal(false);       // Hide modal
    };
    
    const handleCancelDelete = () => {
        setShowModal(false);  // Hide modal without deleting
    };
      
    return (
    <div className="min-h-screen w-full flex justify-center items-center">
        {/* Background container with margin-top and border shadow */}
        <div className="bg-gray-300 min-h-[700px] min-w-[500px] rounded-lg shadow-lg w-full max-w-5xl p-8">
        <div className='flex gap-5'>
            <h2 className="text-3xl font-bold mb-6">Users</h2>   
        </div>
        {users.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
                <div
                key={user.member_id}
                className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition duration-200"
                >
                <div className="mb-3 text-center font-bold">
                    {user.member_rank}
                </div>
                <div className="mb-3">
                    <span className="font-semibold text-gray-700">Username:</span>{' '}
                    <span className="text-gray-900">{user.username}</span>
                </div>
                <div className="mb-3">
                    <span className="font-semibold text-gray-700">Email:</span>{' '}
                    <span className="text-gray-900">{user.email}</span>
                </div>
                <div className="mb-3">
                    <span className="font-semibold text-gray-700">Name:</span>{' '}
                    <span className="text-gray-900">
                    {user.firstName} {user.lastName}
                    </span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Birthday:</span>{' '}
                    <span className="text-gray-900">{user.birthday}</span>
                </div>
                <button
                    type="button"
                    className="w-[100%] py-2 mt-4 rounded-lg bg-red-500 text-white font-medium text-lg flex items-center justify-center gap-2 hover:bg-red-600 transition"
                    onClick={ ()=> handleDelete(user.email) }
                >
                    <TrashIcon></TrashIcon>DELETE
                </button>
                <ConfirmationModal
                    show={showModal}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
                </div>
            ))}
            </div>
        ) : (
            <div>No users found.</div>
        )}
        </div>
    </div>
    );
};

export default UserManage;
