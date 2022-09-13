import { Avatar } from "antd";
import { Actions, Container, Labels, Pair } from "./styles";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { showToast } from "../../../../components/ShowToast";
import api from "../../../../services/api";

interface ICompanyItem {
  companyName: string;
  area: string;
  cnpj: string;
  unitiesQuantity: number;
  usersQuantity: number;
  company_id: string;
  handleRender: () => void;
}

export function CompanyItem({
  companyName,
  cnpj,
  area,
  usersQuantity,
  unitiesQuantity,
  company_id,
  handleRender,
}: ICompanyItem) {
  async function deleteCompany() {
    try {
      await api.delete(`/companies/${company_id}`).then(() => {
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
    <Container>
      <Avatar size={{ xs: 10, sm: 18, md: 24, lg: 48, xl: 64, xxl: 84 }} />
      <div>
        <Labels>
          <Pair>
            <span>Nome da companhia</span>
            <span>{companyName}</span>
          </Pair>
          <Pair>
            <span>Ramo</span>
            <span>{area}</span>
          </Pair>
          <Pair>
            <span>CNPJ</span>
            <span>{cnpj}</span>
          </Pair>
          <Pair>
            <span>Nº de unidades</span>
            <span>{unitiesQuantity}</span>
          </Pair>
          <Pair>
            <span>Nº de funcionários</span>
            <span>{usersQuantity}</span>
          </Pair>
        </Labels>
      </div>
      <Actions>
        <FaEdit color="var(--gray)" />
        <FaRegTrashAlt color="var(--error)" onClick={() => deleteCompany()} />
      </Actions>
    </Container>
  );
}
