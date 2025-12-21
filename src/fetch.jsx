
// // import React, { useEffect, useState } from "react";

// // function FetchExample() {
// //   const [users, setUsers] = useState([]);

// //   async function getUserData() {
// //     const url = "https://dummyjson.com/users";
// //     const response = await fetch(url);
// //     const data = await response.json();
// //     setUsers(data.users);
// //     console.log(data.users);
// //   }

// //   useEffect(() => {
// //     getUserData();
// //   }, []);

// //   return (
// //     <div>
// //       <h1>Fetch Data From API</h1>

// //       {users.map((user) => (
// //         <p key={user.id}>{user.firstName}</p>
// //       ))}
// //     </div>
// //   );
// // }

// // export default FetchExample;


// import React, { useEffect, useState } from "react";

// function FirstUser() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     async function fetchFirstUser() {
//       const response = await fetch("https://dummyjson.com/users");
//       const data = await response.json();

//       // ✅ get FIRST user
//       setUser(data.users[0]);
//     }

//     fetchFirstUser();
//   }, []);

//   return (
//     <div>
//       <h1>First User Data</h1>

//       {user ? (
//         <div>
//           <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Age:</strong> {user.age}</p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default FirstUser;

import React, { useEffect } from "react";

function FetchFirstUserConsole() {
  useEffect(() => {
    async function fetchFirstUser() {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();

      // ✅ log FIRST user in console
      console.log(data.users[0]);
    }

    fetchFirstUser();
  }, []);

  return (
    <div>
      <h1>Check Console</h1>
    </div>
  );
}

export default FetchFirstUserConsole;

