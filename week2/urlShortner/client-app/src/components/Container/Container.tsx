import * as React from "react";
import FormContainer from "../FormContainer/FormContainer";
import DataTable from "../DataTable/DataTable";
import { UrlData } from "../../interface/UrlData";
import axios from "axios";
import { serverUrl } from "../../helpers/constatnts";

interface IContainerProps {}

const Container: React.FunctionComponent<IContainerProps> = () => {
  const [data, setData] = React.useState<UrlData[]>([]);

  const fetchTableData = async () => {
    const response = await axios.get(`${serverUrl}/shortUrl`);
    console.log("response", response);
    setData(response.data);

  };

  React.useEffect(() => {
    fetchTableData();
  },[]);

  return (
    <div className="">
      <FormContainer />
      <DataTable data={data} />
    </div>
  );
};

export default Container;
