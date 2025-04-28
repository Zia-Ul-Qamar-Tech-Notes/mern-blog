import {
  Footer,
  FooterTitle,
  FooterLink,
  FooterLinkGroup,
  FooterDivider,
  FooterCopyright,
} from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

function FooterCom() {
  const currentYear = new Date().getFullYear();
  return (
    <Footer container className=" border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="w-full grid justify-between sm:flex md:grid-cols-1">
          <div>
            <Link
              to={"/"}
              className=" self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Mirza's
              </span>
              Blog
            </Link>
          </div>
          <div className=" mt-5 grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6 ">
            <div>
              <FooterTitle title="About" />
              <FooterLinkGroup col={true}>
                <FooterLink href="/about" target="_blank">
                  About Us
                </FooterLink>
                <FooterLink href="privacy-policy" target="_blank">
                  Privacy Policy
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Followus" />
              <FooterLinkGroup col={true}>
                <FooterLink
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferer"
                >
                  Linkedin
                </FooterLink>
                <FooterLink href="https://www.x.com">Twitter</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col={true}>
                <FooterLink
                  href="/copyright"
                  target="_blank"
                  rel="noopener noreferer"
                >
                  Copyrights
                </FooterLink>
                <FooterLink href="/userdata">User Data Info</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider className="my-6" />
        <div className="flex items-center justify-between w-full sm:flex-row flex-col">
          <FooterCopyright
            href="https://mirza-zia-portfolio.netlify.app/"
            by="Mirza Zia with ❤️"
            year={currentYear}
          />
        </div>
      </div>
    </Footer>
  );
}

export default FooterCom;
