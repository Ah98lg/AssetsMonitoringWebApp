import { Avatar } from "antd";
import { Actions, Container, Labels, Pair } from "./styles";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import api from "../../../../services/api";
import { showToast } from "../../../../components/ShowToast";

interface IUserItem {
  userName: string;
  age: number;
  role: string;
  user_id: string;
  company_id: string;
  workAt: string;
  handleRender: () => void;
}

export function UserItem({
  userName,
  age,
  role,
  company_id,
  user_id,
  handleRender,
  workAt,
}: IUserItem) {
  async function deleteUser() {
    try {
      await api.delete(`/users/${company_id}/${user_id}`).then(() => {
        showToast({
          type: "success",
          message: "Exclusão de usuário",
          description: "O usuário foi excluido com sucesso",
        });
      });
    } catch (error) {
      showToast({
        type: "error",
        message: "Exclusão de usuário",
        description: "Não foi possivel excluir o usuário selecionado",
      });
    } finally {
      handleRender();
    }
  }
  return (
    <Container>
      <Avatar size={{ xs: 10, sm: 18, md: 24, lg: 48, xl: 64, xxl: 84 }} />
      <div className="Labels">
        <Labels>
          <Pair>
            <span>Nome de usuário</span>
            <span>{userName}</span>
          </Pair>
          <Pair>
            <span>Idade</span>
            <span>{age}</span>
          </Pair>
          <Pair>
            <span>Função</span>
            <span>{role}</span>
          </Pair>
          <Pair>
            <span>Trabalha na companhia</span>
            <span>{workAt}</span>
          </Pair>
        </Labels>
      </div>
      <Actions>
        <FaEdit color="var(--gray)" />
        <FaRegTrashAlt color="var(--error)" onClick={() => deleteUser()} />
      </Actions>
    </Container>
  );
}
