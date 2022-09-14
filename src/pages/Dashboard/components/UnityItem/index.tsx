import { Avatar } from "antd";
import { Actions, Container, Labels, Pair } from "./styles";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import api from "../../../../services/api";
import { showToast } from "../../../../components/ShowToast";
import { useState } from "react";
import { UnityModal } from "../../../../components/UnityModal";

interface IUnityItem {
  unity: IUnity;
  company_id: string;
  companies: ICompany[];
  handleRender: () => void;
}

export function UnityItem({
  unity,
  company_id,
  handleRender,
  companies,
}: IUnityItem) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  async function deleteUnity() {
    try {
      await api.delete(`/unities/${company_id}/${unity._id}`).then(() => {
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
    <>
      <UnityModal
        toggleModal={toggleModal}
        onSubmit={handleRender}
        open={isOpen}
        isEdit={isOpen}
        unity={unity}
        companies={companies}
        company_id={company_id}
      />

      <Container>
        <Avatar size={{ xs: 10, sm: 18, md: 24, lg: 48, xl: 64, xxl: 84 }} />
        <div>
          <Labels>
            <Pair>
              <span>Nome da Unidade</span>
              <span>{unity.unityName}</span>
            </Pair>
            <Pair>
              <span>Cidade alocada</span>
              <span>{unity.city}</span>
            </Pair>
            <Pair>
              <span>Estado</span>
              <span>{unity.state}</span>
            </Pair>
            <Pair>
              <span>Qtd. de máquinas</span>
              <span>{unity.assets.length}</span>
            </Pair>
          </Labels>
        </div>
        <Actions>
          <FaEdit color="var(--gray)" onClick={() => toggleModal()} />
          <FaRegTrashAlt color="var(--error)" onClick={() => deleteUnity()} />
        </Actions>
      </Container>
    </>
  );
}
