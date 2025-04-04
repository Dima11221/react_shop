import {Header} from "./layout/Header/Header.tsx";
import {Footer} from "./layout/Footer/Footer.tsx";
import {Shop} from "./components/Shop/Shop.tsx";

function App() {


    return (
        <>
            <>
                {/*<Header title='React Shop' />*/}
                <Header />
                {/*<Footer text='GitHub page' />*/}

                <Shop />
                <Footer />
            </>
        </>
    )
}

export default App