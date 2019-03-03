import Link from "next/link";

class Nav extends React.Component {
  render(){
    return(
      <Link href="/sell">
        <a>Sell</a>
      </Link>
    )
  }
}

export default Nav;