import balances from "../../assets/vectors/icons/balances.svg";
import dashboard from "../../assets/vectors/icons/dashboard.svg";
import create from "../../assets/vectors/icons/circle_with_plus.svg";
import escrow from "../../assets/vectors/icons/escrow.svg";
import mpa from "../../assets/vectors/icons/mpa.svg";
import pay from "../../assets/vectors/icons/pay.svg";
import support from "../../assets/vectors/icons/support.svg";
import vaults from "../../assets/vectors/icons/vaults.svg";

export const sidebarData = [
    {
        title: "Manage",
        path: "/manage",
        icon: dashboard,

        subNav: [
            {
                title: "My Squids",
                path: "/manage-personal"
            },
            {
                title: "Created By Me",
                path: "/manage-created"
            }
        ]
    },
    {
        title: "Create",
        path: "/create",
        icon: create,
    },
    // {
    //     title: "Dashboard",
    //     path: "/dashboard",
    //     icon: dashboard
    // },
    // {
    //     title: "My Balances",
    //     path: "/balances",
    //     icon: balances
    // },
    // {
    //     title: "Mutual Payments",
    //     path: "/mpa",
    //     icon: mpa,

        // subNav: [
        //     {
        //         title: "Fixed",
        //         path: "/mpa-fixed"
        //     },
        //     {
        //         title: "Modifiable",
        //         path: "/mpa-modifiable",
        //         pro: true
        //     },
        //     {
        //         title: "Legacy",
        //         path: "/mpa-legacy"
        //     }
        // ]
    // },
    // {
    //     title: "Escrow",
    //     path: "/escrow",
    //     icon: escrow,

    //     subNav: [
    //         {
    //             title: "Single",
    //             path: "/escrow-single"
    //         },
    //         {
    //             title: "Multi-Stage",
    //             path: "/escrow-multi-stage",
    //             pro: true
    //         },
    //         {
    //             title: "Timed",
    //             path: "/escrow-timed",
    //             pro: true
    //         }
    //     ]
    // },
    // {
    //     title: "Vaults",
    //     path: "/vaults",
    //     icon: vaults,

    //     subNav: [
    //         {
    //             title: "Personal",
    //             path: "/vaults-personal"
    //         },
    //         {
    //             title: "Shared",
    //             path: "/vaults-shared",
    //             pro: true
    //         },
    //         {
    //             title: "Time-Locked",
    //             path: "/vaults-time-locked",
    //             pro: true
    //         }
    //     ]
    // },
    // {
    //     title: "Pay",
    //     path: "/pay",
    //     icon: pay
    // },
    // {
    //     title: "Support",
    //     path: "/support",
    //     icon: support
    // }
];