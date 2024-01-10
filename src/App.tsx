// import Canvas from "./components/Canvas";

import Canvas from "./components/Canvas/Canvas";

/**
 * 애플리케이션 진입점
 * @returns{JSX.Element} App 컴포넌트
 */
const App = (): JSX.Element => {
  return (
    <div className="m-4">
      <h1 className="text-3xl font-bold">그림판</h1>
      <Canvas />
    </div>
  );
};

export default App;
