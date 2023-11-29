import "../styles/Footer.css";

const Footer = () => {
    const year = new Date().getFullYear();
  
    return <footer className="footer">{`© Nicole Duffy ${year} for educational purposes only`}</footer>;
};

export default Footer;