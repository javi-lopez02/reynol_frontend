import { Edit, Trash2, User } from "lucide-react";
import { User as UserType } from "../../types";
import { deleteUsersRequest } from "../../services/user";
import { toast } from "sonner";

interface Props {
  user: UserType;
  handleEdit: (id: string) => void;
  setUsers: React.Dispatch<React.SetStateAction<UserType[] | null>>;
}

const UserCard: React.FC<Props> = ({ user, setUsers, handleEdit }) => {
  const handleDelete = (id: string) => {
    deleteUsersRequest(id)
      .then(() => {
        toast.success("Usuario eliminado con exito");
        setUsers((prev) => {
          return prev
            ? prev.filter((user) => {
                return user.id !== id;
              })
            : null;
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al eliminar el Usuario");
      });
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{user.username}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(user?.id)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="Editar usuario"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(user.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Eliminar usuario"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-gray-700 text-sm bg-gray-50 p-2 rounded">
        {user.description}
      </p>
    </div>
  );
};

export default UserCard;
