import {Header} from "./layout/Header/Header.tsx";
import {Footer} from "./layout/Footer/Footer.tsx";
import {Shop} from "./components/Shop/Shop.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {


    return (
        // <>
        //     <>
        //         {/*<Header title='React Shop' />*/}
        //         <Header />
        //         {/*<Footer text='GitHub page' />*/}
        //
        //         <Shop />
        //         <Footer />
        //     </>
        // </>

        <Router>
            <Header />
            <div>
                <Routes>
                    <Route path="/react_shop" element={<Shop />}/>
                </Routes>
            </div>
            <Footer />
        </Router>
    )
}

export default App