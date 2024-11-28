import { MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

interface Type {
    title: any;
    path: any;
    icon: any;
    color: any;
}

const Item = ( Props: Type) => {
  const location = useLocation();
  return (
    <MenuItem
      icon={Props.icon}
      rootStyles={{
        color: Props.path === location.pathname ? "#6870fa" : undefined,
      }}
    >
      <Link 
        to={Props.path} 
        style={{
          textDecoration: "none", 
          color: "inherit", // Rangi `MenuItem` ga mos bo'lishi uchun
        }}
      >
        {Props.title}
      </Link>
    </MenuItem>
  );
};

export default Item;