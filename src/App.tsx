import {Header} from "./layout/Header/Header.tsx";
import {Footer} from "./layout/Footer/Footer.tsx";
import {Shop} from "./components/Pages/Shop/Shop.tsx";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import {CheckoutForm} from "./components/Pages/CheckoutForm/CheckoutForm.tsx";
import './styles/main.scss'

function App() {


    return (
        <Router>
            <Header />
                <div className='mainWrapper'>
                  <Routes>
                    <Route path="/" element={<Shop />} />
                    <Route path='/checkout_form' element={<CheckoutForm />} />
                  </Routes>
                </div>
            <Footer />
        </Router>
      //  "hommepage": "https://github.com/Dima11221/react_shop",
    )
}

export default App