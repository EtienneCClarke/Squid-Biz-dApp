import { SideBar } from "../../components";
import { CreatedTable } from "./components";

export default function ManageCreated() {

    return(
        <main>
            <SideBar />
            <div className="view">
                <div className="container">
                    <div className="table-container">
                        <CreatedTable />
                    </div>
                </div>
            </div>
        </main>
    );
}