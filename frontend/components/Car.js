import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../api/Axios";

const Car = () => {
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
    const CAR_REGEXP = /^[a-zA-Z0-9]{2,20}$/;
    const CAR_YEAR_REGEXP = /^[0-9]{4}$/;
    const CARS_URL = "/cars";

    const [Brand, setBrand] = useState("");
    const [Model, setModel] = useState("");
    const [Year, setYear] = useState("");
    const [LicensePlate, setLicensePlate] = useState("");
    const [Engine, setEngine] = useState("");
    const [Mileage, setMileage] = useState("");

    const [cars, setCars] = useState([]);

    const [errMsg, setErrMsg] = useState('');

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(CARS_URL, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                const result = await response.data;
                setCars(result);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }})();
    }, []);
    useEffect(() => {
        if (errMsg) {
            const timer = setTimeout(() => {
                setErrMsg('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errMsg]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const field1 = CAR_REGEXP.test(Brand);
        const field2 = CAR_REGEXP.test(Model);
        const field3 = CAR_YEAR_REGEXP.test(Year);
        const field4 = CAR_REGEXP.test(LicensePlate);
        const field5 = CAR_REGEXP.test(Engine);
        const field6 = CAR_REGEXP.test(Mileage);
        if (!field1 || !field2 || !field3 || !field4 || !field5 || !field6) {
            setErrMsg("Invalid input");
        } else {
            try {
                const response = await axios.post(CARS_URL,
                    JSON.stringify({
                        brand: Brand,
                        model: Model,
                        year: Number(Year),
                        license_plate: LicensePlate,
                        engine: Engine,
                        mileage: Number(Mileage),
                    }),
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    });
                const createCarResponse = response?.data?.data;
                console.log(createCarResponse);
                setBrand("");
                setModel("");
                setYear("");
                setLicensePlate("");
                setEngine("");
                setMileage("");
                navigate("/car");
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 400) {
                    setErrMsg('Missing data');
                } else if (err.response?.status === 401) {
                    setErrMsg('Unauthorized');
                } else {
                    setErrMsg('Login failed');
                }
            }
        }
    };

    return (
        <section>
            <h1>Car</h1>
            <button onClick={toggleForm}>Create Car</button>
            {showForm && (
                <div className="car-form">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Brand:
                            <input type="text" name="Brand" value={Brand} onChange={(e) => setBrand(e.target.value)}/>
                        </label>
                        <label>
                            Model:
                            <input type="text" name="Model" value={Model} onChange={(e) => setModel(e.target.value)}/>
                        </label>
                        <label>
                            Engine:
                            <input type="text" name="Model" value={Engine} onChange={(e) => setEngine(e.target.value)}/>
                        </label>
                        <label>
                            Year:
                            <input type="text" name="Year" value={Year} onChange={(e) => setYear(e.target.value)}/>
                        </label>
                        <label>
                            License Plate:
                            <input type="text" name="LicensePlate" value={LicensePlate} onChange={(e) => setLicensePlate(e.target.value)}/>
                        </label>
                        <label>
                            Mileage:
                            <input type="text" name="Model" value={Mileage} onChange={(e) => setMileage(e.target.value)}/>
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
            {errMsg && <p className="errmsg">{errMsg}</p>}
            <div className="car-list">
                {cars.length === 0 ? (
                    <p>0</p>
                ) : (
                    cars.map((car) =>
                        <div key={car.id}>
                            <h2>{car["brand"]} {car["model"]}</h2>
                            <p>Year: {car["year"]}</p>
                            <p>License Plate: {car["license_plate"]}</p>
                            <p>Engine: {car["engine"]}</p>
                            <p>Mileage: {car["mileage"]}</p>
                        </div>
                    )
                )}
            </div>
        </section>
    );
};

export default Car
