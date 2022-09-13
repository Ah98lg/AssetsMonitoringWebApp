import Separator from "../Separator";
import { Container, Footer, Header, IconDiv, Value } from "./styles";

interface IGrid {
  header: string;
  value: number | string;
  footer: string;
  icon: JSX.Element;
  onClick: () => void;
}

export function GridComponent({ onClick, footer, header, value, icon }: IGrid) {
  return (
    <Container>
      <IconDiv>{icon}</IconDiv>
      <Header>
        <span>{header}</span>
      </Header>
      <Value>
        <span>{value ?? 0}</span>
      </Value>
      <Separator />
      <Footer onClick={onClick}>
        <span>{footer}</span>
      </Footer>
    </Container>
  );
}
