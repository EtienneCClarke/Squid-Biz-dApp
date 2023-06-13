import { PersonalTable } from "./components";
import { SideBar } from "../../components";

export default function ManagePersonal() {

    return(
        <main>
            <SideBar />
            <div className="view">
                <div className="container">
                    <div className="table-container">
                        <PersonalTable />
                    </div>
                </div>
            </div>
        </main>
    );
}