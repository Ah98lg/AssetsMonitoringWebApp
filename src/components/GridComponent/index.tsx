import Separator from "../Separator";
import { Container, Footer, Header, IconDiv, Value } from "./styles";

interface IGrid {
  header: string;
  value: number | string;
  footer: string;
  icon: JSX.Element;
}

export function GridComponent({ footer, header, value, icon }: IGrid) {
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
      <Footer>
        <span>{footer}</span>
      </Footer>
    </Container>
  );
}
