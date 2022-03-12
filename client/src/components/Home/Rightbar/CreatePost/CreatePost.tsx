import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { Add } from "../../../icons";
import s from "./index.module.scss";
import { useAuth } from "../../../../Firebase/AuthContext";
import { useStore } from "../../../../store/UIStore";
import { observer } from "mobx-react-lite";

const CreatePost = ({
  style,
  mobile,
}: {
  style?: object;
  mobile?: boolean;
}) => {
  const [uploadedImage, setUploadedImage] = React.useState({
    preview: "",
    raw: "",
  });
  const [alert, setAlert] = React.useState("");
  const [isURL, setIsURL] = React.useState(false);
  const { setPosts, showUI, setShowUI } = useStore();
  const { getCurrentUsername, currentUser } = useAuth();
  const imgUrlRef: any = React.useRef();
  const imgTextRef: any = React.useRef();

  const handleClick = () => {
    setShowUI(!showUI);
  };

  function validURL(str: string) {
    var pattern = new RegExp( // TODO
      "^(https?:\\/\\/)?" + // protocol
        "/https?://.*.(?:png|jpg|gif)/i" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  const handleSubmit = async (e: any) => {
    // TODO
    e.preventDefault();

    let username = getCurrentUsername();

    const imgObj = new FormData();

    let image = imgUrlRef?.current?.value;
    let text = imgTextRef?.current?.value;
    imgObj.append("image", uploadedImage.raw);
    imgObj.append("username", username);
    imgObj.append("user_id", currentUser!.uid);
    imgObj.append("text", text);

    if (!username) setAlert("network error");
    if (!validURL(image)) setAlert("invalid url");
    if (text.length > 256) setAlert("text length is longer than 256");
    if (!!alert) return;

    console.log(image);

    let data;

    if (isURL) {
      data = {
        image,
        text,
        username,
        user_id: currentUser!.uid,
      };
    } else {
      data = imgObj;
    }

    console.log(imgObj.get("user_id"));
    let url = isURL
      ? process.env.REACT_APP_SERVER! + "api/post/create"
      : process.env.REACT_APP_SERVER! + "api/post/create/customimg";

    let res = await axios.post(url, data);
    console.log(res.data);

    if (res.data.success === true) {
      let res = await axios.get(process.env.REACT_APP_SERVER + "api/posts");
      setPosts(res.data);
    }
  };

  const handleImageInputChange = async (e: any) => {};

  const handleUploadImage = (e: any) => {
    e.preventDefault();
    if (e.target.files.length) {
      let a = e.target.files[0];
      Object.defineProperty(a, "name", {
        writable: true,
        value: "image." + a.name.split(".").pop(),
      });
      setUploadedImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: a,
      });
    }
  };

  const buttonStyle = (isURL: boolean) =>
    isURL
      ? {
          backgroundColor: "#2563eb",
          borderColor: "#2563eb",
          color: "white",
        }
      : {
          backgroundColor: "white",
          borderColor: "#2563eb",
          color: "#2563eb",
        };

  const CreatePostUI: React.FC = () => {
    let app = document.getElementById("root");
    if (app) {
      return ReactDOM.createPortal(
        <>
          <div className={showUI ? `${s.uiWrapper}` : `${s.hidden}`}>
            <div className={s.uiMain + " rounded"}>
              <form
                className={"w-full px-8 py-2"}
                onSubmit={(e: any) => handleSubmit(e)}
              >
                <div className="flex justify-center p-4">
                  <button
                    onClick={() => setIsURL(false)}
                    className="border-2 w-[110px] text-blue-600 border-blue-600 rounded-l-lg mr-2"
                    style={buttonStyle(!isURL)}
                  >
                    From Device
                  </button>
                  <button
                    onClick={() => setIsURL(true)}
                    className="border-2 w-[110px] text-blue-600 border-blue-600  rounded-r-lg"
                    style={buttonStyle(isURL)}
                  >
                    Via URL
                  </button>
                </div>
                <div className={s.formRow}>
                  {isURL ? (
                    <>
                      <span>Image Url</span>
                      <input
                        className="border rounded border-gray-300 p-0.5 pl-2"
                        onChange={handleImageInputChange}
                        maxLength={600}
                        ref={imgUrlRef}
                      ></input>
                    </>
                  ) : (
                    <>
                      <span>Image</span>
                      <input
                        className="border rounded border-gray-300 p-0.5 pl-2"
                        type="file"
                        onChange={handleUploadImage}
                        style={{ display: "none" }}
                        id="file"
                      ></input>
                      <label
                        htmlFor={"file"}
                        className="border-b-2 w-[95px] border-dotted cursor-pointer text-blue-600 border-blue-600"
                        style={
                          !!uploadedImage.preview.length
                            ? {
                                width: "140px",
                                whiteSpace: "normal",
                                fontSize: "14px",
                              }
                            : { width: "95px", whiteSpace: "nowrap" }
                        }
                      >
                        {!!uploadedImage.preview.length
                          ? "Click to choose again"
                          : "Choose Image"}
                      </label>
                    </>
                  )}
                </div>
                <div className={s.formRow}>
                  <span>Descripton</span>
                  <input
                    className="border rounded border-gray-300 p-0.5 pl-2"
                    maxLength={256}
                    ref={imgTextRef}
                  ></input>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="border-2 mt-24 border-blue-600 bg-blue-600 text-white px-2 py-1 rounded-lg"
                  >
                    Gonderi Olustur
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div
            className={showUI ? `${s.layer}` : `${s.hidden}`}
            onClick={() => setShowUI(!showUI)}
          />
        </>,
        app
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <div
      className={!mobile ? s.buttonWrapper : `${s.buttonWrapper} ${s.mobile}`}
      style={style ? style : {}}
    >
      <button className={s.createButton} onClick={handleClick}>
        <div style={{ width: "26px", margin: "0 12px", marginTop: "4px" }}>
          <Add />
        </div>
        Yeni gonderi olustur
      </button>
      <CreatePostUI />
    </div>
  );
};

export default observer(CreatePost);
