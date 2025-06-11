import { useEffect, useState } from "react";
import { getUsersRequest } from "../services/user";
import { User } from "../types";

function useUser() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState<Array<string> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);
    getUsersRequest()
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setError(["Error al cargar los usuarios"]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setUsers]);

  return { users, error, loading, setUsers,setError, setLoading };
}

export default useUser;
