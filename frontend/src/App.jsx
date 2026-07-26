import AppRoutes from "./routes/AppRoutes";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/Toast.css";
import { ConfirmProvider } from "./context/ConfirmContext";

function App() {

    return (
        <ConfirmProvider>
            <AppRoutes />

            <ToastContainer
                position="top-right"
                autoClose={3500}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="light"
                transition={Slide}
            />
        </ConfirmProvider>
    );
}

export default App;