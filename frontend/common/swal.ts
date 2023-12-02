import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import '@sweetalert2/theme-dark/dark.scss';
export const SweetAlert = withReactContent(Swal);
export const ToastSweet = ({title, icon, timer}:{title:string, icon:"success" | "error" | "warning" | "info" | "question"; timer:number}) =>{
    SweetAlert.fire({
        toast: true,
        title:`${title}`,
        icon,
        timer,
        timerProgressBar: true,                
        showConfirmButton: false,
        position: "top-right"
    })
}