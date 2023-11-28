import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header(insideDashboard) {
  return (
    <Navbar className="bg-success">
        <Container>
          <Navbar.Brand >

            <Link style={{textDecoration:"none",color:"white"}} to={'/'}>
            <div style={{ fontWeight: 'bold' }}>{' '}Project-Fair</div>
            </Link>  
          </Navbar.Brand>
          { insideDashboard &&
            <div className='btn btn-primary'>Logout</div>}
        </Container>
      </Navbar>
  );
}

export default Header;