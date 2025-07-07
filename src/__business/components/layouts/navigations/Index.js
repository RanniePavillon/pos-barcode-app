import { Top } from './top/Index';
import { Left } from './left/Index';

const Navigation = ({ side }) => {
    let Nav = [Top, Left]
    Nav = Nav[side]
    return (
        <Nav/>
    )
}

export default Navigation;