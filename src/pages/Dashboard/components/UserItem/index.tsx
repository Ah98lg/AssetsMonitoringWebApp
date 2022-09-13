import { Avatar } from "antd";
import { Actions, Container, Labels, Pair } from "./styles";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

interface IUnityItem {
  name: string;
  city: string;
  state: string;
  assetsNumber: number;
}

export function UserItem({ name, city, state, assetsNumber }: IUnityItem) {
  return (
    <Container>
      <Avatar size={{ xs: 10, sm: 18, md: 24, lg: 48, xl: 64, xxl: 84 }} />
      <div>
        <Labels>
          <Pair>
            <span>Nome da Unidade</span>
            <span>{name}</span>
          </Pair>
          <Pair>
            <span>Cidade alocada</span>
            <span>{city}</span>
          </Pair>
          <Pair>
            <span>Estado</span>
            <span>{state}</span>
          </Pair>
          <Pair>
            <span>Qtd. de máquinas</span>
            <span>{assetsNumber}</span>
          </Pair>
        </Labels>
      </div>
      <Actions>
        <FaEdit color="var(--gray)" />
        <FaRegTrashAlt color="var(--error)" />
      </Actions>
    </Container>
  );
}
