import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { Add } from "../../../icons";
import s from "./index.module.scss";
import { useAuth } from "../../../../Firebase/AuthContext";

type Props = {
  setPosts: Function;
  style?: object;
};

const CreatePost: React.FC<Props> = ({ setPosts, style }) => {
  const [showUI, setShowUI] = React.useState(false);
  const [alert, setAlert] = React.useState("");
  const { getCurrentUsername } = useAuth();

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
    let image = e.target.childNodes[0].childNodes[1].value;
    let text = e.target.childNodes[1].childNodes[1].value;

    if (!username) setAlert("network error");
    if (!validURL(image)) setAlert("invalid url");
    if (text.length > 256) setAlert("text length is longer than 256");
    if (!!alert) return;

    let res = await axios.post(
      process.env.REACT_APP_SERVER! + "api/post/create",
      {
        image: image,
        text: text,
        username: username,
      }
    );
    console.log(res.data);

    if (res.data.success === true) {
      let res = await axios.get(process.env.REACT_APP_SERVER + "api/posts");
      setPosts(res.data);
    }
  };

  const handleImageInputChange = async (e: any) => {};

  const CreatePostUI: React.FC = () => {
    let app = document.getElementById("root");
    if (app) {
      return ReactDOM.createPortal(
        <>
          <div className={showUI ? `${s.uiWrapper}` : `${s.hidden}`}>
            <div className={s.uiMain}>
              <form onSubmit={(e: any) => handleSubmit(e)}>
                <div className={s.formRow}>
                  <span>Image Url</span>
                  <input
                    onChange={handleImageInputChange}
                    maxLength={256}
                  ></input>
                </div>
                <div className={s.formRow}>
                  <span>Text</span>
                  <input maxLength={256}></input>
                </div>
                <button type="submit">Gonderi Olustur</button>
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
    <div className={s.buttonWrapper} style={style ? style : {}}>
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

export default CreatePost;
