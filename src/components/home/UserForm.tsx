import { Plus, Save, User, X } from "lucide-react";
import { User as UserType } from "../../types";
import { toast } from "sonner";
import { createUsersRequest, editUsersRequest } from "../../services/user";
import { useRef } from "react";

interface UserFormProps {
  id: string;
  isEditing: boolean;
  setUsers: React.Dispatch<React.SetStateAction<UserType[] | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
  id,
  isEditing,
  setLoading,
  setUsers,
  handleCancel,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const clearForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(event.currentTarget));

    const inputName = data["username"] as string;
    const inputEmail = data["email"] as string;
    const inputPassword = data["password"] as string;
    const inputDescription = data["description"] as string;

    // Validaciones
    if (!inputName) {
      toast.error("El nombre del usuario es requerido.");
      setLoading(false);
      return;
    }
    if (!inputPassword) {
      toast.error("La contraseña es requerida.");
      setLoading(false);
      return;
    }
    if (inputPassword.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres.");
      setLoading(false);
      return;
    }
    if (!inputEmail) {
      toast.error("El email es requerido.");
      setLoading(false);
      return;
    }
    if (!inputDescription) {
      toast.error("La descripción es requerida.");
      setLoading(false);
      return;
    }

    if (isEditing === true) {
      editUsersRequest(id, {
        username: inputName,
        email: inputEmail,
        password: inputPassword,
        description: inputDescription,
      })
        .then((res) => {
          setUsers((prev) => {
            if (!prev) {
              return null;
            }
            const user = res.data.data;

            const userFilter = prev.filter((prevUser) => {
              return prevUser.id !== id;
            });
            return [user, ...userFilter];
          });
          toast.success("Usuario editado con exito");
          clearForm();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al editar el usuario");
        })
        .finally(() => {
          setLoading(false);
        });
    }

    if (isEditing === false) {
      createUsersRequest({
        username: inputName,
        email: inputEmail,
        password: inputPassword,
        description: inputDescription,
      })
        .then((res) => {
          setUsers((prev) => {
            return prev ? [res.data.data, ...prev] : null;
          });
          toast.success("Usuario creado con exito");
          clearForm();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error al crear el usuario, email repetido");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
    >
      <div className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">
          {isEditing ? "Editar Usuario" : "Nuevo Usuario"}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de Usuario
          </label>
          <input
            type="text"
            name="username"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
            placeholder="Ingresa el nombre de usuario"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
            placeholder="usuario@ejemplo.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            name="description"
            rows={3}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none border-gray-300`}
            placeholder="Describe al usuario..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        {isEditing && (
          <button
            onClick={handleCancel}
            type="button"
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          {isEditing ? (
            <Save className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          {isEditing ? "Guardar" : "Crear Usuario"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
