const getAllUsers = `
  query {
    getAllUsers{
      username
      id
    }
  }
`;

const getUserById = `
  query getUserById($id: ID){
    getUserById(id: $id){
      username
      id
      email
    }
  }
`;

export { getAllUsers, getUserById };
