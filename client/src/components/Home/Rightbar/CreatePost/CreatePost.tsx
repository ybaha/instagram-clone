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
  const [isURL, setIsURL] = React.useState(true);
  const { setPosts, showUI, setShowUI } = useStore();
  const { getCurrentUsername } = useAuth();
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
      };
    } else {
      data = imgObj;
    }

    console.log(data);
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

  const CreatePostUI: React.FC = () => {
    let app = document.getElementById("root");
    if (app) {
      return ReactDOM.createPortal(
        <>
          <div className={showUI ? `${s.uiWrapper}` : `${s.hidden}`}>
            <div className={s.uiMain}>
              <form onSubmit={(e: any) => handleSubmit(e)}>
                <div className={s.formRow}>
                  {isURL ? (
                    <>
                      <span>Image Url</span>
                      <input
                        onChange={handleImageInputChange}
                        maxLength={600}
                        ref={imgUrlRef}
                      ></input>
                    </>
                  ) : (
                    <>
                      <span>Image</span>
                      <input
                        type="file"
                        onChange={handleUploadImage}
                        style={{ display: "none" }}
                        id="file"
                      ></input>
                      <label
                        htmlFor={"file"}
                        style={{ background: "#0095f6", borderRadius: "3px" }}
                      >
                        {!!uploadedImage.preview.length
                          ? "Yuklendi. Tekrar secmek icin dokun"
                          : "Select Image"}
                      </label>
                    </>
                  )}
                </div>
                <button
                  style={{ width: "100px" }}
                  onClick={() => setIsURL(!isURL)}
                >
                  {isURL ? "Cihazdan" : "URL ile"}
                </button>
                <div className={s.formRow}>
                  <span>Text</span>
                  <input maxLength={256} ref={imgTextRef}></input>
                </div>
                <button type="submit" className={s.submit}>
                  Gonderi Olustur
                </button>
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
