import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../api/Axios";

const Cars = () => {
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
                navigate(0);
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
            <div className={`car-form ${showForm ? 'show' : ''}`}>
                <form onSubmit={handleSubmit}>
                    <div className="input-div first">
                        <input id="brand" className="input" type="text" placeholder=" " name="Brand" value={Brand}
                               onChange={(e) => setBrand(e.target.value)}/>
                        <div className="space"></div>
                        <label htmlFor="brand" className="placeholder">Brand</label>
                    </div>
                    <div className="input-div other">
                        <input id="model" className="input" type="text" placeholder=" " name="Model" value={Model}
                               onChange={(e) => setModel(e.target.value)}/>
                        <div className="space"></div>
                        <label htmlFor="model" className="placeholder">Model</label>
                    </div>
                    <div className="input-div other">
                        <input id="engine" className="input" type="text" placeholder=" " name="Engine" value={Engine}
                               onChange={(e) => setEngine(e.target.value)}/>
                        <div className="space"></div>
                        <label htmlFor="engine" className="placeholder">Engine</label>
                    </div>
                    <div className="input-div other">
                        <input id="year" className="input" type="text" placeholder=" " name="Year" value={Year}
                               onChange={(e) => setYear(e.target.value)}/>
                        <div className="space"></div>
                        <label htmlFor="year" className="placeholder">Year</label>
                    </div>
                    <div className="input-div other">
                        <input id="licensePlate" className="input" type="text" placeholder=" " name="LicensePlate"
                               value={LicensePlate} onChange={(e) => setLicensePlate(e.target.value)}/>
                        <div className="space"></div>
                        <label htmlFor="licensePlate" className="placeholder">License Plate</label>
                    </div>
                    <div className="input-div other">
                        <input id="mileage" className="input" type="text" placeholder=" " name="Milage"
                               value={Mileage} onChange={(e) => setMileage(e.target.value)}/>
                        <div className="space"></div>
                        <label htmlFor="mileage" className="placeholder">Mileage</label>
                    </div>
                    <button type="submit" className="car-form-submit-button">Submit</button>
                </form>
            </div>
            {errMsg && <p className="errmsg">{errMsg}</p>}
            <div className={`grid-content-4 ${showForm ? 'content-blur' : ''}`}>
                {cars.length === 0 ? (
                    <p>0</p>
                ) : (
                    cars.map((car) =>
                        <div key={car.id} className="car-list-item grid-item"
                             onClick={() => navigate(`/car/${car.id}`)}>
                            <h2>{car["brand"]} {car["model"]}</h2>
                            <p>Year: {car["year"]}</p>
                            <p>License Plate: {car["license_plate"]}</p>
                            <p>Engine: {car["engine"]}</p>
                            <p>Mileage: {car["mileage"]}</p>
                        </div>
                    )
                )}
                <div className="car-list-item grid-item">
                    Add Car
                </div>
            </div>
        </section>
    );
};

export default Cars
