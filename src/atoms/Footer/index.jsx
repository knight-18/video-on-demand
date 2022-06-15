import "../../css/footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <footer className="footer-distributed">
      <div className="footer-right">
        <a href="#">
          <FacebookIcon color="white" />
        </a>
        <a href="#">
          <InstagramIcon color="white" />
        </a>
      </div>

      <div className="footer-left">
        <p className="footer-links">
          <a className="link-1" href="#">
            Home
          </a>

          <a href="/short-content">Short Content</a>

          <a href="/long-content">Long Content</a>
        </p>

        <p>VOD &copy; 2022</p>
      </div>
    </footer>
  );
};

export default Footer;
