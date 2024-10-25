import Logo from '../assets/logo.jpeg'

function Footer() {
    const iconStyle = {
        color :'red',
        fontSize:'20px',
        fontWeight:'bold'

    }
    return ( 
    <div className="footer">
        <img src={Logo} />
        <span>Made with <b style={iconStyle}>♥️</b> and <b>React</b></span>
    </div> 
    );
}

export default Footer;