import React from "react";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/Hooks";

const AdminLogin = () => {
  const [user, setUser] = React.useState({
    usuario: "",
    contra: "",
  });

  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const handleLogin = () => {
    if (user.usuario === "admin" && user.contra === "admin") {
      login();
      navigate("/admin/dashboard");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se ha encontrado el usuario",
        confirmButtonColor: "#f27474",
      });
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  return (
    <main>
      <div className="admin-fondo">
        <div className="admin-content">
          <img src="./img/logo-footer.png" alt="" />
          <h6>Iniciar sesion</h6>
          <div className="admin-inputs">
            <TextInput
              placeholder="Usuario..."
              setForm={setUser}
              value="usuario"
            />
            <TextInput
              placeholder="Contrasena..."
              setForm={setUser}
              value="contra"
              isPassword
            />
          </div>
          <Button noArrow onClick={handleLogin} variant="filled-pink">
            Ingresar
          </Button>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;
