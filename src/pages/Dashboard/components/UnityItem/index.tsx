import { Avatar } from "antd";
import { Actions, Container, Labels, Pair } from "./styles";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import api from "../../../../services/api";
import { showToast } from "../../../../components/ShowToast";

interface IUnityItem {
  name: string;
  city: string;
  state: string;
  assetsNumber: number;
  unity_id: string;
  company_id: string;
  handleRender: () => void;
}

export function UnityItem({
  name,
  city,
  state,
  assetsNumber,
  unity_id,
  company_id,
  handleRender,
}: IUnityItem) {
  async function deleteUnity() {
    try {
      await api.delete(`/unities/${company_id}/${unity_id}`).then(() => {
        showToast({
          type: "success",
          message: "Exclusão de unidade",
          description: "A unidade foi excluida com sucesso",
        });
      });
    } catch (error) {
      showToast({
        type: "error",
        message: "Exclusão de unidade",
        description: "Não foi possivel excluir a unidade escolhida",
      });
    } finally {
      handleRender();
    }
  }

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
        <FaRegTrashAlt color="var(--error)" onClick={() => deleteUnity()} />
      </Actions>
    </Container>
  );
}
