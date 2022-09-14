import { Avatar } from "antd";
import { Actions, Container, Labels, Pair } from "./styles";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import api from "../../../../services/api";
import { showToast } from "../../../../components/ShowToast";
import { useState } from "react";
import { UserModal } from "../../../../components/UserModal";

interface IUserItem {
  user: IUser;
  company_id: string;
  companies: ICompany[];
  workAt: string;
  handleRender: () => void;
}

export function UserItem({
  user,
  handleRender,
  workAt,
  company_id,
  companies,
}: IUserItem) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  async function deleteUser() {
    try {
      await api.delete(`/users/${company_id}/${user._id}`).then(() => {
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
    <>
      <UserModal
        toggleModal={toggleModal}
        onSubmit={handleRender}
        open={isOpen}
        user={user}
        isEdit={isOpen}
        company_id={company_id}
        companies={companies}
      />
      <Container>
        <Avatar size={{ xs: 10, sm: 18, md: 24, lg: 48, xl: 64, xxl: 84 }} />
        <div className="Labels">
          <Labels>
            <Pair>
              <span>Nome de usuário</span>
              <span>{user.userName}</span>
            </Pair>
            <Pair>
              <span>Idade</span>
              <span>{user.age}</span>
            </Pair>
            <Pair>
              <span>Função</span>
              <span>{user.role}</span>
            </Pair>
            <Pair>
              <span>Trabalha na companhia</span>
              <span>{workAt}</span>
            </Pair>
          </Labels>
        </div>
        <Actions>
          <FaEdit color="var(--gray)" onClick={() => toggleModal()} />
          <FaRegTrashAlt color="var(--error)" onClick={() => deleteUser()} />
        </Actions>
      </Container>
    </>
  );
}
