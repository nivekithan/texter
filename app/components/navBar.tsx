import { GrTwitter } from "react-icons/gr";
import { RiHome4Line } from "react-icons/ri";
import { HiOutlineHashtag } from "react-icons/hi";
import { BsBookmark } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { FormButton } from "./formButton";
import { Link } from "@remix-run/react";

export type NavBarProps = {
  userName: string;
};

export const NavBar = ({ userName }: NavBarProps) => {
  return (
    <div className="flex flex-col gap-y-5">
      <GrTwitter size="30px" className="mb-3 ml-4" />
      <SideBarOption icons={<RiHome4Line size="30px" />} text="Home" to="/" />
      <SideBarOption
        icons={<HiOutlineHashtag size="30px" />}
        text="Explore"
        to="/explore"
      />
      <SideBarOption
        icons={<BsBookmark size="27px" className="ml-1" />}
        text="Bookmarks"
        to="/bookmarks"
      />
      <SideBarOption
        icons={<FaUserAlt size="30px" className="ml-1" />}
        text="Profile"
        to={`/${userName}`}
      />
      <div className="ml-4">
        <FormButton
          action={`/logout`}
          method="post"
          className="w-full border-inherit border border-gray-300 hover:border-texter-blue rounded-full px-8 py-3 text-texter-blue"
        >
          Log out
        </FormButton>
      </div>
    </div>
  );
};

type SideBarOptionProps = {
  icons: React.ReactElement;
  text: string;
  to: string;
};

const SideBarOption = ({ icons, text, to }: SideBarOptionProps) => {
  return (
    <Link
      className="flex items-center gap-x-4 hover:bg-gray-900 rounded-full py-3 px-4"
      to={to}
    >
      {icons}
      <span className="text-lg">{text}</span>
    </Link>
  );
};
