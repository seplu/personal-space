import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../api/Axios";

const Car = () => {
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
    const CAR_REGEXP = /^[a-zA-Z0-9]{2,20}$/;
    const CAR_YEAR_REGEXP = /^[0-9]{4}$/;

    const CREATE_CAR_URL = "/cars";

    const [Brand, setBrand] = useState("");
    const [Model, setModel] = useState("");
    const [Year, setYear] = useState("");
    const [LicensePlate, setLicensePlate] = useState("");
    const [Engine, setEngine] = useState("");
    const [Mileage, setMileage] = useState("");

    const [validYear, setValidYear] = useState(false);
    const [validCar, setValidCar] = useState(false);
    const [validCarDetails, setValidCarDetails] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    useEffect(() => {
        const result = CAR_YEAR_REGEXP.test(Year);
        setValidYear(result);
    }, [Year]);
    useEffect(() => {
        const result = CAR_REGEXP.test(Brand) && CAR_REGEXP.test(Model);
        setValidCar(result);
    }, [Brand, Model]);
    useEffect(() => {
        const result = CAR_REGEXP.test(LicensePlate) && CAR_REGEXP.test(Engine) && CAR_REGEXP.test(Mileage);
        setValidCarDetails(result);
    }, [LicensePlate, Engine, Mileage]);

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
        }
        try {
            const response = await axios.post(CREATE_CAR_URL,
                JSON.stringify({
                    Brand: Brand,
                    Model: Model,
                    Year: parseInt(Year,4),
                    LicensePlate: LicensePlate,
                    Engine: Engine,
                    Mileage: parseInt(Mileage,12)
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
                            <input type="number" name="Year" value={Year} aria-invalid={validYear ? "false" : "true"} onChange={(e) => setYear(e.target.value)}/>
                        </label>
                        <label>
                            License Plate:
                            <input type="text" name="LicensePlate" value={LicensePlate}
                                   onChange={(e) => setLicensePlate(e.target.value)}/>
                        </label>
                        <label>
                            Mileage:
                            <input type="text" name="Model" value={Mileage} onChange={(e) => setMileage(e.target.value)}/>
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </section>
    );
};

export default Car
