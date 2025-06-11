import React, { useState } from "react";
import { User } from "lucide-react";
import UserCard from "../components/home/UserCard";
import UserForm from "../components/home/UserForm";
import useUser from "../customHooks/useUser";
import { toast } from "sonner";
import { User as UserType } from "../types";

// Componente principal de la aplicación
const UserCRUD: React.FC = () => {
  const { users, loading, error, setUsers, setLoading } = useUser();
  const [editingUser, setEditingUser] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const handleEdit = (id: string) => {
    setEditingUser(true);
    setId(id);
  };

  const handleCancel = () => {
    setEditingUser(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Gestión de Usuarios
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Mini CRUD para administrar usuarios
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div>
            <UserForm
              isEditing={editingUser}
              setUsers={setUsers}
              setLoading={setLoading}
              id={id}
              handleCancel={handleCancel}
            />
          </div>

          {/* Lista de usuarios */}
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Usuarios ({users?.length})
              </h2>
            </div>

            {loading && (
              <div className="text-center text-gray-600">
                Cargando usuarios...
              </div>
            )}
            {!loading && (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {users?.length === 0 ? (
                  <div className="text-center py-8">
                    <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No hay usuarios registrados</p>
                    <p className="text-sm text-gray-400">
                      Crea tu primer usuario
                    </p>
                  </div>
                ) : (
                  users?.map((user: UserType) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      setUsers={setUsers}
                      handleEdit={handleEdit}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {error && toast.error("Error al cargar los usuarios")}
    </div>
  );
};

export default UserCRUD;
