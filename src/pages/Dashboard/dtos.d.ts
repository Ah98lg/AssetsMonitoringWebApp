interface ICompany {
  companyName: string;
  companyOwner: string;
  area: string;
  country: string;
  cnpj: string;
  unities: [IUnity];
  users: [IUser];
}

interface IUnity {
  unityName: string;
  city: string;
  state: string;
  assets: [IAsset];
}

interface IUser {
  userName: string;
  age: number;
  role: string;
}

interface IAsset {
  assetName: string;
  description: string;
  model: string;
  assetOwner: string;
  status: "Running" | "Alerting" | "Stopped";
  healthLevel: number;
  image: HTMLImageElement;
}
