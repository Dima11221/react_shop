import {Header} from "./layout/Header/Header.tsx";
import {Footer} from "./layout/Footer/Footer.tsx";
import {Shop} from "./components/Shop/Shop.tsx";

import {ContextProvider} from "./context.tsx";

function App() {


    return (
        <>
            <Header />
            <ContextProvider>
                <Shop />
            </ContextProvider>
            <Footer />
        </>
    )
}

export default App