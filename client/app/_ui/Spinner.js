function Spinner() {
  return (
    <div className="h-screen w-full fixed backdrop-blur-lg top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] inset-0 z-20">
      <div className="load">
        <div className="hamburger">
          <div className="top-bun"></div>
          <div className="pickle"></div>
          <div className="pickle"></div>
          <div className="tomato">
            <div></div>
          </div>
          <div className="tomato">
            <div></div>
          </div>
          <div className="cheese"></div>
          <div className="cheese"></div>
          <div className="beef"></div>
          <div className="bottom-bun"></div>
        </div>
        <h1>Loading...</h1>
      </div>
    </div>
  );
}

export default Spinner;
