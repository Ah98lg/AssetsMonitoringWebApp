import { Avatar } from "antd";
import { Actions, Container, Labels, Pair } from "./styles";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { showToast } from "../../../../components/ShowToast";
import api from "../../../../services/api";
import { useState } from "react";
import { AssetModal } from "../../../../components/AssetModal";
import { GiGears } from "react-icons/gi";

interface ICompanyItem {
  companyId: string;
  companies: ICompany[];
  unityId: string;
  asset: IAsset;
  handleRender: () => void;
}

export function AssetItem({
  companyId,
  handleRender,
  unityId,
  asset,
  companies,
}: ICompanyItem) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  async function deleteAsset() {
    try {
      await api
        .delete(`/assets/${companyId}/${unityId}/${asset._id}`)
        .then(() => {
          showToast({
            type: "success",
            message: "Exclusão de máquina",
            description: "A máquina foi excluida com sucesso",
          });
        });
    } catch (error) {
      showToast({
        type: "error",
        message: "Exclusão de máquina",
        description: "Não foi possivel excluir a máquina selecionada",
      });
    } finally {
      handleRender();
    }
  }

  return (
    <>
      <AssetModal
        toggleModal={toggleModal}
        onSubmit={handleRender}
        open={isOpen}
        isEdit={isOpen}
        companies={companies}
        asset={asset}
        company_id={companyId}
        unity_id={unityId}
      />

      <Container>
        <Avatar
          size={{ xs: 10, sm: 18, md: 24, lg: 48, xl: 64, xxl: 84 }}
          icon={<GiGears size="112%" color="#1890ff" />}
          style={{
            background: "#fefefe",
            border: `2px solid ${
              asset.status === "Running"
                ? "var(--active-green)"
                : asset.status === "Stopped"
                ? "var(--error)"
                : "var(--alert)"
            }`,
          }}
        />
        <div>
          <Labels>
            <Pair>
              <span>Nome da máquina</span>
              <span>{asset.assetName}</span>
            </Pair>
            <Pair>
              <span>Modelo</span>
              <span>{asset.model}</span>
            </Pair>
            <Pair>
              <span>Status</span>
              <span>{asset.status}</span>
            </Pair>
            <Pair>
              <span>Nível de saúde</span>
              <span>{asset.healthLevel}%</span>
            </Pair>
            <Pair>
              <span>Descrição</span>
              <span className="description">{asset.description}</span>
            </Pair>
          </Labels>
        </div>
        <Actions>
          <FaEdit color="var(--gray)" onClick={() => toggleModal()} />
          <FaRegTrashAlt color="var(--error)" onClick={() => deleteAsset()} />
        </Actions>
      </Container>
    </>
  );
}
