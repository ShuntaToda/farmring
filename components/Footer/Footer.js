import logo from "../../image/logo-white.svg";

export const Footer = () => {
  return (
    <footer className="l-footer d-flex flex-column">
      <div className="l-footer__logo">
        <img src={logo.src}></img>
      </div>
      <div className="l-footer__creater text-light"></div>
    </footer>
  );
};
