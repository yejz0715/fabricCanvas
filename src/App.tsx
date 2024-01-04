// import Canvas from "./components/Canvas";

import Canvas from "./components/Canvas/Canvas";

/**
 * 애플리케이션 진입점
 * @returns{JSX.Element} App 컴포넌트
 */
const App = (): JSX.Element => {
    return (
        <>
            <div className="text-3xl font-bold underline">hi</div>
            <Canvas />
        </>
    );
};

export default App;
