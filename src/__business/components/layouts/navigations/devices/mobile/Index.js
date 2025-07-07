import Top from './Top'
import Left from './Left'
import Bottom from './Bottom'

const Navigation = ({ side }) => {
    let Nav = [Top, Left, Bottom]
    Nav = Nav[side]
    return <Nav />
}

export default Navigation;