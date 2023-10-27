import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { Formik } from "formik";

function Auth() {
  const { login } = useAuth();
  return (
    <div>
      <h1>Auth</h1>

      <Formik
        initialValues={{ password: "", email: "" }}
        validate={(values) => {
          const errors = {};
          const regexpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9]+\.[A-Z]{2,}$/i;

          if (!values.email) {
            errors.email = "Ingrese un email";
          } else if (!regexpEmail.test(values.email)) {
            errors.email = "Email invalido";
          }

          if (!values.password) {
            errors.password = "Ingrese una contraseña";
          } else if (values.password.length < 8) {
            errors.password = "La contraseña debe tener más de 8 caracteres";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          login(values);

          setSubmitting(false);
        }}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          handleBlur,
          errors,
          touched,
        }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "5px",
              }}
            >
              <label htmlFor="email" style={{ fontSize: 10, color: "red" }}>
                {errors.email && touched.email && errors.email}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "5px",
              }}
            >
              <label htmlFor="password" style={{ fontSize: 10, color: "red" }}>
                {errors.password && touched.password && errors.password}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Contraseña"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <button type="submit">Enviar</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Auth;
