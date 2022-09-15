import { Avatar } from "antd";
import { Actions, Container, Labels, Pair } from "./styles";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { showToast } from "../../../../components/ShowToast";
import api from "../../../../services/api";
import { CompanyModal } from "../../../../components/CompanyModal";
import { useState } from "react";
import { BiBuildingHouse } from "react-icons/bi";

interface ICompanyItem {
  company: ICompany;
  handleRender: () => void;
}

export function CompanyItem({ company, handleRender }: ICompanyItem) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  async function deleteCompany() {
    try {
      await api.delete(`/companies/${company._id}`).then(() => {
        showToast({
          type: "success",
          message: "Exclusão de companhia",
          description: "A companhia foi excluida com sucesso",
        });
      });
    } catch (error) {
      showToast({
        type: "error",
        message: "Exclusão de companhia",
        description: "Não foi possivel excluir a companhia selecionada",
      });
    } finally {
      handleRender();
    }
  }

  return (
    <>
      <CompanyModal
        toggleModal={toggleModal}
        onSubmit={handleRender}
        open={isOpen}
        isEdit={isOpen}
        company={company}
      />

      <Container>
        <Avatar
          size={{ xs: 10, sm: 18, md: 24, lg: 48, xl: 64, xxl: 84 }}
          icon={<BiBuildingHouse size="80%" color="#1890ff" />}
          style={{
            background: "#fefefe",
          }}
        />
        <div>
          <Labels>
            <Pair>
              <span>Nome da companhia</span>
              <span>{company.companyName}</span>
            </Pair>
            <Pair>
              <span>Ramo</span>
              <span>{company.area}</span>
            </Pair>
            <Pair>
              <span>CNPJ</span>
              <span>{company.cnpj}</span>
            </Pair>
            <Pair>
              <span>Nº de unidades</span>
              <span>{company.unities.length}</span>
            </Pair>
            <Pair>
              <span>Nº de funcionários</span>
              <span>{company.users.length}</span>
            </Pair>
          </Labels>
        </div>
        <Actions>
          <FaEdit color="var(--gray)" onClick={() => toggleModal()} />
          <FaRegTrashAlt color="var(--error)" onClick={() => deleteCompany()} />
        </Actions>
      </Container>
    </>
  );
}
