import {Header} from "./layout/Header/Header.tsx";
import {Footer} from "./layout/Footer/Footer.tsx";
import {Shop} from "./components/Pages/Shop/Shop.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {CheckoutForm} from "./components/Pages/CheckoutForm/CheckoutForm.tsx";
import './styles/main.scss'

function App() {


    return (
        <Router>
            <Header />
                <div className='mainWrapper'>
                  <Routes>
                    <Route path="/react_shop" element={<Shop />} />
                    <Route path='/checkout_form' element={<CheckoutForm />} />
                  </Routes>
                </div>
            <Footer />
        </Router>
    )
}

export default App