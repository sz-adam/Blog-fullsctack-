import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";

function Footer() {
  const socialMediaElements = [
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: <BsFacebook />,
      hoverClass: "hover:text-blue-500",
      iconStyle:"text-blue-800"
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: <BsInstagram />,
      hoverClass: "hover:text-pink-500",
      iconStyle:"text-pink-800"
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: <BsTwitter />,
      hoverClass: "hover:text-blue-400",
      iconStyle:"text-blue-800"
    },
  ];
  return (
    <section className="bg-DeepGray border-t-2">
      <div className="max-w-screen-xl px-4 pb-6 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <div className="flex justify-center mt-8 space-x-6 text-4xl">           
        {socialMediaElements.map((socialMedia, index) => (
        <a
          key={index}
          href={socialMedia.href}       
          className={` transition duration-300 ${socialMedia.hoverClass} ${socialMedia.iconStyle}`}
        >
          {socialMedia.icon}
        </a>
      ))}
        </div>
      </div>
    </section>
  );
}

export default Footer;
