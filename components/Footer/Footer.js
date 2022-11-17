import logo from "../../image/logo.svg";

export const Footer = () => {
  return (
    <footer className="l-footer">
      <div className="l-footer__logo">
        <img src={logo.src}></img>
      </div>
    </footer>
  );
};
