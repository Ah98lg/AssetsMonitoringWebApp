import { Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import api from "../../services/api";
import AppModal from "../Modal";
import { showToast } from "../ShowToast";
import { Container } from "./styles";

interface IFormData {
  userName: string;
  role: string;
  age: string | number;
}

interface IUsersModal {
  toggleModal: () => void;
  onSubmit: () => void;
  open: boolean;
  companies: ICompany[];
  user?: IUser;
  isEdit?: boolean;
  company_id?: string;
}

export function UserModal({
  toggleModal,
  open,
  onSubmit,
  companies,
  user,
  isEdit,
  company_id,
}: IUsersModal) {
  const [formData, setFormData] = useState<IFormData>({
    userName: "",
    age: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState(company_id ?? "");

  function clearInputs() {
    setFormData({
      userName: "",
      age: "",
      role: "",
    });
  }

  useEffect(() => {
    if (isEdit) {
      setFormData({
        userName: user?.userName ?? "",
        age: user?.age ?? 0,
        role: user?.role ?? "",
      });
    }
  }, [isEdit]);

  async function createUser() {
    setLoading(true);
    if (
      formData.userName !== "" &&
      formData.age !== "" &&
      formData.role !== "" &&
      companyId !== ""
    ) {
      const body: IFormData = {
        userName: formData.userName,
        age: formData.age,
        role: formData.role,
      };

      try {
        await (isEdit
          ? api.patch(`/users/${company_id}/${user?._id}`, body)
          : api.post(`/users/${companyId}`, body)
        ).then(() => {
          showToast({
            type: "success",
            message: `${isEdit ? "Edição de usuário" : "Novo usuário"}`,
            description: `A ${isEdit ? "edição" : "criação"} do usuário ${
              formData.userName
            } foi um sucesso`,
          });
        });
      } catch (error) {
        showToast({
          type: "error",
          message: `${isEdit ? "Edição de usuário" : "Novo usuário"}`,
          description: `Não foi possivel realizar a ${
            isEdit ? "edição" : "criação"
          } do usuário ${formData.userName}`,
        });
      } finally {
        setLoading(false);
        clearInputs();
        toggleModal();
        onSubmit();
      }
    } else {
      showToast({
        type: "error",
        message: `${isEdit ? "Edição de usuário" : "Novo usuário"}`,
        description: `Preencha os campos obrigatórios`,
      });
    }
  }

  return (
    <AppModal
      title={isEdit ? "Editar usuário" : "Cadastrar novo usuário"}
      open={open}
      onOk={() => createUser()}
      isConfirmLoading={loading}
      toggleModal={toggleModal}
    >
      <Container>
        <Form
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
        >
          <Form.Item required label="Companhia">
            <Select onSelect={(event: any) => setCompanyId(event)}>
              {companies.map((company) => {
                return (
                  <Select.Option value={company._id}>
                    {company.companyName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item required label="Nome">
            <Input
              value={formData.userName}
              onChange={(event) => {
                setFormData((prevState) => ({
                  ...prevState,
                  userName: event.target?.value,
                }));
              }}
            />
          </Form.Item>
          <Form.Item required label="Idade">
            <Input
              type="number"
              value={formData.age}
              onChange={(event) => {
                setFormData((prevState) => ({
                  ...prevState,
                  age: event.target?.value,
                }));
              }}
            />
          </Form.Item>
          <Form.Item required label="Função">
            <Input
              value={formData.role}
              onChange={(event) => {
                setFormData((prevState) => ({
                  ...prevState,
                  role: event.target?.value,
                }));
              }}
            />
          </Form.Item>
        </Form>
      </Container>
    </AppModal>
  );
}
