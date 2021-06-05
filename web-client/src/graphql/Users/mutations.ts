export const createUser = `
  mutation createUser($username:String, $email: String, $password: String){
    createUser(username: $username, email: $email, password: $password){
      id
      email
    }
  }
`;

export const updatePassword = `
  mutation updatePassword($username: String!, $oldPassword: String!, $newPassword: String!){
    updatePassword(username: $username, oldPassword: $oldPassword, newPassword: $newPassword){
      id
    }
  } 
`;

export const deleteUser = `
  mutation deleteUser($id: ID){
    deleteUser(id: $id){
      message
      success
    }
  }
`;
