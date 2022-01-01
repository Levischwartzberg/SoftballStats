import AdminMenu from "../components/adminMenu";

function AdminHome(props) {
    return (
        <AdminMenu logout={props.logout}></AdminMenu>
    )
}
export default AdminHome;