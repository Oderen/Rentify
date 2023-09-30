//@ts-ignore
import { ThreeDots } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className="container">
      <ThreeDots
        width={150}
        height={150}
        radius="9"
        color={"#3470ff"}
        wrapperStyle={{
          position: "absolute",
          top: "50%",
          right: "50%",
          transform: "translate(50%, -50%)",
        }}
        ariaLabel="three-dots-loading"
        visible={true}
      />
      <h1 className={css.loader__title}>Loading...</h1>
    </div>
  );
};

export default Loader;
