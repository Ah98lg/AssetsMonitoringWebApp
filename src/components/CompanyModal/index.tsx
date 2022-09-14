import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import api from "../../services/api";
import AppModal from "../Modal";
import { showToast } from "../ShowToast";
import { Container } from "./styles";

interface IFormData {
  companyName: string;
  companyOwner: string;
  area: string;
  country: string;
  cnpj: string;
}

interface ICompanyModal {
  toggleModal: () => void;
  onSubmit: () => void;
  open: boolean;
  isEdit?: boolean;
  company?: ICompany;
}

export function CompanyModal({
  toggleModal,
  open,
  onSubmit,
  isEdit,
  company,
}: ICompanyModal) {
  const [formData, setFormData] = useState<IFormData>({
    companyName: "",
    companyOwner: "",
    area: "",
    country: "",
    cnpj: "",
  });
  const [loading, setLoading] = useState(false);

  function clearInputs() {
    setFormData({
      companyName: "",
      companyOwner: "",
      area: "",
      country: "",
      cnpj: "",
    });
  }

  useEffect(() => {
    if (isEdit) {
      setFormData({
        companyName: company?.companyName ?? "",
        companyOwner: company?.companyOwner ?? "",
        area: company?.area ?? "",
        country: company?.country ?? "",
        cnpj: company?.cnpj ?? "",
      });
    }
  }, [isEdit]);

  async function createCompany() {
    if (
      formData.companyOwner !== "" &&
      formData.companyName !== "" &&
      formData.area !== "" &&
      formData.cnpj !== "" &&
      formData.country !== ""
    ) {
      setLoading(true);
      const body: IFormData = {
        companyName: formData.companyName,
        companyOwner: formData.companyOwner,
        area: formData.area,
        country: formData.country,
        cnpj: formData.cnpj,
      };

      try {
        await (isEdit
          ? api.patch(`/companies/${company?._id}`, body)
          : api.post("/companies", body)
        ).then(() => {
          showToast({
            type: "success",
            message: `${isEdit ? "Edição de companhia" : "Nova companhia"}`,
            description: `A ${isEdit ? "edição" : "criação"} da companhia ${
              formData.companyName
            } foi um sucesso`,
          });
        });
      } catch (error) {
        showToast({
          type: "error",
          message: `${isEdit ? "Edição de companhia" : "Nova companhia"}`,
          description: `Não foi possivel realizar a criação da companhia ${formData.companyName}`,
        });
      } finally {
        setLoading(false);
        toggleModal();
        onSubmit();
        clearInputs();
      }
    } else {
      showToast({
        type: "error",
        message: `${isEdit ? "Edição de companhia" : "Nova companhia"}`,
        description: `Preencha os campos obrigatórios`,
      });
    }
  }

  return (
    <AppModal
      title={isEdit ? "Editar companhia" : "Registrar nova companhia"}
      open={open}
      onOk={() => createCompany()}
      isConfirmLoading={loading}
      toggleModal={toggleModal}
    >
      <Container>
        <Form
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
        >
          <Form.Item
            required
            label="Nome"
            rules={[
              {
                required: true,
                message: "Por favor, insira um nome",
              },
            ]}
          >
            <Input
              value={formData.companyName}
              onChange={(event) => {
                setFormData((prevState) => ({
                  ...prevState,
                  companyName: event.target?.value,
                }));
              }}
            />
          </Form.Item>
          <Form.Item required label="Proprietário">
            <Input
              value={formData.companyOwner}
              onChange={(event) => {
                setFormData((prevState) => ({
                  ...prevState,
                  companyOwner: event.target?.value,
                }));
              }}
            />
          </Form.Item>
          <Form.Item
            required
            label="Segmento"
            tooltip="Qual a área de atuação da companhia (Ex.: Manufatura)"
          >
            <Input
              value={formData.area}
              onChange={(event) => {
                setFormData((prevState) => ({
                  ...prevState,
                  area: event.target?.value,
                }));
              }}
            />
          </Form.Item>
          <Form.Item required label="País">
            <Input
              value={formData.country}
              onChange={(event) => {
                setFormData((prevState) => ({
                  ...prevState,
                  country: event.target?.value,
                }));
              }}
            />
          </Form.Item>
          <Form.Item required label="CNPJ">
            <Input
              value={formData.cnpj}
              onChange={(event) => {
                setFormData((prevState) => ({
                  ...prevState,
                  cnpj: event.target?.value,
                }));
              }}
            />
          </Form.Item>
        </Form>
      </Container>
    </AppModal>
  );
}
