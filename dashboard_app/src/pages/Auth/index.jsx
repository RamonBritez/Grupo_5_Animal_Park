import { useAuth } from "../../context/AuthProvider";

function Auth() {
  const {setCurrentUser} = useAuth();
  return (
    <div>
      <h1>Auth</h1>

      <button onClick={setCurrentUser({name: "Testing user"})}>Login trucho</button>
    </div>
  );
}

export default Auth;
