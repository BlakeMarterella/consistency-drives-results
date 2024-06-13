import { environment } from "@environments/environment";

interface NavbarItem {
    // icon: FaIconComponent["icon"];
    title: string;
    description: string;
    path: string[];
}

const navbarItems: NavbarItem[] = [
    {
        title: "Home",
        description: "Home",
        path: ["/"]
    },
    {
        title: "About",
        description: "About",
        path: ["/", "about"]
    },
    // {
    //     title: "Pricing",
    //     description: "Plans and Pricing",
    //     path: ["/", environment.routes.homeView.pricingPage]
    // },
]

export default navbarItems;
