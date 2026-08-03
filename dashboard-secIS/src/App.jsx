import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Executivo from "./pages/Executivo";
import Auditoria from "./pages/Auditoria";
import SCI from "./pages/SCI";
import Demo from "./pages/Demo";

import { api } from "./services/api";

import "./App.css";


function App() {


    const [dados, setDados] = useState(null);



    useEffect(() => {


        api.get("/bi/metrics")

            .then(response => {

                setDados(response.data);

            })

            .catch(error => {

                console.error(
                    "Erro ao carregar métricas:",
                    error
                );

            });


    }, []);



    if (!dados) {

        return (

            <div className="loading">

                Carregando Painel SECIS...

            </div>

        );

    }



    return (

        <BrowserRouter>


            <main className="container">


                <Header />


                <Routes>


                    <Route

                        path="/"

                        element={

                            <Home

                                indicadores={
                                    dados.indicadores
                                }

                            />

                        }

                    />



                    <Route

                        path="/executivo"

                        element={<Executivo />}

                    />



                    <Route

                        path="/auditoria"

                        element={<Auditoria />}

                    />



                    <Route

                        path="/sci"

                        element={<SCI />}

                    />


                    <Route

                        path="/demo"

                        element={<Demo />}

                    />


                </Routes>



                <Footer

                    timestamp={
                        dados.timestamp
                    }

                />


            </main>


        </BrowserRouter>

    );

}



export default App;
