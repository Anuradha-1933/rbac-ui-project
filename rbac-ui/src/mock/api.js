// src/mock/api.js
const users = [
    { id: 1, name: "John Doe", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Editor", status: "Inactive" },
  ];
  
  const roles = [
    { id: 1, name: "Admin", permissions: ["read", "write", "delete"] },
    { id: 2, name: "Editor", permissions: ["read", "write"] },
  ];
  
  export const getUsers = () => Promise.resolve(users);
  export const getRoles = () => Promise.resolve(roles);
  
  export const addUser = (user) => {
    users.push({ id: users.length + 1, ...user });
    return Promise.resolve(users);
  };
  
  export const updateUser = (id, updatedUser) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) users[index] = { ...users[index], ...updatedUser };
    return Promise.resolve(users);
  };
  
  export const deleteUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) users.splice(index, 1);
    return Promise.resolve(users);
  };
  
  export const addRole = (role) => {
    roles.push({ id: roles.length + 1, ...role });
    return Promise.resolve(roles);
  };
  
  export const updateRole = (id, updatedRole) => {
    const index = roles.findIndex((role) => role.id === id);
    if (index !== -1) roles[index] = { ...roles[index], ...updatedRole };
    return Promise.resolve(roles);
  };
  