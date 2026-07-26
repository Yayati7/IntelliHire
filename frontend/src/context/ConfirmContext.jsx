import { createContext, useContext, useState, useCallback } from "react";
import ConfirmDialog from "../components/common/ConfirmDialog";

const ConfirmContext = createContext(() => Promise.resolve(false));

export function ConfirmProvider({ children }) {

    const [request, setRequest] = useState(null);

    const confirm = useCallback((message, options = {}) => {
        return new Promise((resolve) => {
            setRequest({
                message,
                title: options.title || "Please Confirm",
                confirmText: options.confirmText || "Confirm",
                cancelText: options.cancelText || "Cancel",
                danger: options.danger || false,
                resolve
            });
        });
    }, []);

    function respond(result) {
        request?.resolve(result);
        setRequest(null);
    }

    return (
        <ConfirmContext.Provider value={confirm}>
            {children}

            <ConfirmDialog
                open={!!request}
                title={request?.title}
                message={request?.message}
                confirmText={request?.confirmText}
                cancelText={request?.cancelText}
                danger={request?.danger}
                onConfirm={() => respond(true)}
                onCancel={() => respond(false)}
            />
        </ConfirmContext.Provider>
    );

}

export function useConfirm() {
    return useContext(ConfirmContext);
}