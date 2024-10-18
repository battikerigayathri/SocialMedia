// // pages/profile.js
// import { useState } from 'react';
// import axios from 'axios';

// const ProfilePage = ({ initialUserData }:any) => {
//   const [user, setUser] = useState(initialUserData);

//   const handleStatusChange = (event: { target: { value: any; }; }) => {
//     setUser({ ...user, status: event.target.value });
//   };

//   const handleUpdate = async () => {
//     try {
//       // Assuming your API endpoint for updating user data is /api/user
//       await axios.put('/api/user', user);
//       alert('Profile updated successfully');
//     } catch (error) {
//       console.error('Failed to update profile', error);
//       alert('Failed to update profile');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-6 bg-white rounded shadow-lg">
//       <h1 className="text-2xl font-bold mb-4">Profile</h1>
//       <div className="w-full max-w-md">
//         <div className="mb-4">
//           <label className="block text-gray-700">Username</label>
//           <input
//             type="text"
//             value={user.username}
//             readOnly
//             className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Name</label>
//           <input
//             type="text"
//             value={user.name}
//             onChange={(e) => setUser({ ...user, name: e.target.value })}
//             className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Email</label>
//           <input
//             type="email"
//             value={user.email}
//             onChange={(e) => setUser({ ...user, email: e.target.value })}
//             className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Role</label>
//           <input
//             type="text"
//             value={user.role}
//             readOnly
//             className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Status</label>
//           <select
//             value={user.status}
//             onChange={handleStatusChange}
//             className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring"
//           >
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//         </div>
//         <div className="flex justify-end">
//           <button
//             onClick={handleUpdate}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export async function getServerSideProps() {
//   // Fetch user data from your API
//   // Replace the URL with your actual API endpoint
//   const response = await fetch('https://api.example.com/user');
//   const initialUserData = await response.json();

//   return {
//     props: {
//       initialUserData,
//     },
//   };
// }

// export default ProfilePage;

// pages/profile.js
// import { useState } from "react";
// import { gql, useQuery, useMutation } from "@apollo/client";
// // import client from "../apolloClient";

// const GET_USER = gql`
//   query GetUser {
//     user {
//       id
//       username
//       name
//       email
//       role
//       status
//     }
//   }
// `;

// const UPDATE_USER = gql`
//   mutation UpdateUser($name: String!, $email: String!, $status: String!) {
//     updateUser(name: $name, email: $email, status: $status) {
//       id
//       name
//       email
//       status
//     }
//   }
// `;


// const ProfilePage = ({ initialUserData } : any) => {
//   const [user, setUser] = useState(initialUserData);
//   const [updateUser] = useMutation(UPDATE_USER);

//   const handleStatusChange = (event: { target: { value: any; }; }) => {
//     setUser({ ...user, status: event.target.value });
//   };

//   const handleUpdate = async () => {
//     try {
//       await updateUser({
//         variables: { name: user.name, email: user.email, status: user.status },
//       });
//       alert("Profile updated successfully");
//     } catch (error) {
//       console.error("Failed to update profile", error);
//       alert("Failed to update profile");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-6 bg-white rounded shadow-lg">
//       <h1 className="text-2xl font-bold mb-4">Profile</h1>
//       <div className="w-full max-w-md">
//         <div className="mb-4">
//           <label className="block text-gray-700">Username</label>
//           <input
//             type="text"
//             value={user.username}
//             readOnly
//             className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Name</label>
//           <input
//             type="text"
//             value={user.name}
//             onChange={(e) => setUser({ ...user, name: e.target.value })}
//             className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Email</label>
//           <input
//             type="email"
//             value={user.email}
//             onChange={(e) => setUser({ ...user, email: e.target.value })}
//             className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Role</label>
//           <input
//             type="text"
//             value={user.role}
//             readOnly
//             className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Status</label>
//           <select
//             value={user.status}
//             onChange={handleStatusChange}
//             className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring"
//           >
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//         </div>
//         <div className="flex justify-end">
//           <button
//             onClick={handleUpdate}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // export async function getServerSideProps() {
// //   const { data } = await client.query({
// //     query: GET_USER,
// //   });

// //   return {
// //     props: {
// //       initialUserData: data.user,
// //     },
// //   };
// // }

// export default ProfilePage;
import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

const GET_USER = gql`
  query GetUser {
    user {
      id
      username
      name
      email
      role
      status
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($name: String!, $email: String!, $status: String!) {
    updateUser(name: $name, email: $email, status: $status) {
      id
      name
      email
      status
      password
    }
  }
`;

const ProfilePage = () => {
  const { data, loading, error } = useQuery(GET_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [user, setUser] = useState(() => data?.user || {
    id: "",
    username: "",
    name: "",
    email: "",
    role: "",
    status: "Active",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser({ ...user, status: event.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateUser({
        variables: { name: user.name, email: user.email, status: user.status },
      });
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={user.username}
            readOnly
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <input
            type="text"
            value={user.role}
            readOnly
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select
            value={user.status}
            onChange={handleStatusChange}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
