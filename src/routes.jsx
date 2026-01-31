import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  ShoppingCartIcon,
  BookmarkIcon,
  Bars3BottomLeftIcon,
  PaintBrushIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables } from "@/pages/dashboard";
import { SignIn } from "@/pages/auth";
import Products from "./pages/dashboard/products";
import Brands from "./pages/dashboard/brands";
import SubCategorys from "./pages/dashboard/subCategorys";
import Colors from "./pages/dashboard/colors";
import ColorInfo from "./pages/info/colorInfo/colorInfo";
import BrandInfo from "./pages/info/brandInfo/brandInfo";
import Categories from "./pages/dashboard/categories";
import CategoryInfo from "./pages/info/categoryInfo/categoryInfo";
import SubCategoryInfo from "./pages/info/subCategoryInfo/subCategoryInfo";
import ProductInfo from "./pages/info/productInfo/productInfo";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "users",
        path: "/users",
        element: <Tables />,
      },
      {
        icon: <ShoppingCartIcon {...icon} />,
        name: "products",
        path: "/products",
        element: <Products />,
      },
      {
        icon: <TagIcon {...icon} />,
        name: "brands",
        path: "/brands",
        element: <Brands />,
      },
      {
        icon: <BookmarkIcon {...icon} />,
        name: "categories",
        path: "/categories",
        element: <Categories />,
      },
      {
        icon: <Bars3BottomLeftIcon {...icon} />,
        name: "sub categories",
        path: "/sub-categories",
        element: <SubCategorys />,
      },
      {
        icon: <PaintBrushIcon {...icon} />,
        name: "colors",
        path: "/colors",
        element: <Colors />,
      },
      {
        path: "/colorInfo/:id",
        element: <ColorInfo />,
      },
      {
        path: "/brandInfo/:id",
        element: <BrandInfo />,
      },
      {
        path: "/categoryInfo/:id",
        element: <CategoryInfo />,
      },
      {
        path: "/subCategoryInfo/:id",
        element: <SubCategoryInfo />,
      },
      {
        path: "/productInfo/:id",
        element: <ProductInfo />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },  
    ],
  },
  {
    title: "_____________________________________",
    layout: "auth",
    pages: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
