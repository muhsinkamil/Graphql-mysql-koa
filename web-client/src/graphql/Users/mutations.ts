export const createUser = `
  mutation createUser($username:String, $email: String, $password: String){
    createUser(username: $username, email: $email, password: $password){
      id
      email
    }
  }
`;
