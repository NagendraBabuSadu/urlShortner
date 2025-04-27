import * as React from "react";
import axios from "axios";
import { serverUrl } from "../../helpers/Constatnts";

interface IFormContainerProps {
  reloadTheUI: () => void;
}

const FormContainer: React.FunctionComponent<IFormContainerProps> = (props) => {
  const { reloadTheUI } = props;
  const [fullUrl, setFullUrl] = React.useState<string>("");

  console.log("==> serverUrl,", serverUrl);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${serverUrl}/shortUrl`, {
        fullUrl: fullUrl,
      });
      setFullUrl("");
      reloadTheUI();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto  pb-10">
      <div className="bg-banner bg-cover my-8 rounded-xl bg-center">
        <div className="w-full h-full rounded-xl p-20 backdrop-brightness-75">
          <h3 className="text-white text-4xl text-center p-4">Url Shortner</h3>
          <p className="text-white text-center pb-2 text-xl font-light">
            Paste your Url to shorten it.
          </p>
          <p className="text-white text-center pb-4 text-sm font-thin">
            Free Tool to shorten a URL
          </p>
          <form action="" onSubmit={handleSubmit}>
            <div className="flex ">
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-slate-800">
                  urlshortner.link /
                </div>
                <input
                  type="text"
                  placeholder="add your link"
                  required
                  value={fullUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFullUrl(e.target.value)
                  }
                  className="block  rounded-xl w-full p-4 ps-32 text-sm text-gray-800 border-gray-300 round-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-500 rounded-lg border border-blue-700 focus:outline"
                >
                  Shorten URL
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
