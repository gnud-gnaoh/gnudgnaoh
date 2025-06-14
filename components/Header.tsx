import Link from "next/link";
import Container from "../components/Container";

export default function Header() {
  return (
    <header>
      <Container>
        <nav> 
          <Link href="/">about</Link>
          <Link href="/posts">posts</Link>
        </nav>
      </Container>
    </header>
  )
}
