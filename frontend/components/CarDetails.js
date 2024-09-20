 import React, {useEffect, useRef, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "../api/Axios";
 import {IoAddCircleOutline, IoClose} from "react-icons/io5";

const CarDetails = () => {
    const [showForm, setShowForm] = useState(false);
    const formRef = useRef(null);
    const { id } = useParams();
    const [carDetails, setCarDetails] = useState(null);
    const [formData, setFormData] = useState({
        DateTime: "",
        Mileage: "",
        TypeOfFuel: "",
        UnitPrice: "",
        TotalPrice: "",
        LitersKwh: "",
        Description: ""
    });
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`/car/${id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                const result = await response.data;
                setCarDetails(result);
            } catch (error) {
                console.error("There was an error fetching the car details!", error);
            }
        })();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            setShowForm(false);
        }
    };

    useEffect(() => {
        if (showForm) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showForm]);

    const clearForm = () => {
        setFormData({
            DateTime: "",
            Mileage: "",
            TypeOfFuel: "",
            UnitPrice: "",
            TotalPrice: "",
            LitersKwh: "",
            Description: ""
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/car/${id}/details`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            const result = await response.data;
            setCarDetails(prevState => [...prevState, result]);
            setFormData({
                DateTime: "",
                Mileage: "",
                TypeOfFuel: "",
                UnitPrice: "",
                TotalPrice: "",
                LitersKwh: "",
                Description: ""
            });
        } catch (error) {
            console.error("There was an error submitting the car details!", error);
            setErrMsg("Error submitting car details");
        }
    };

    if (!carDetails) {
        return <div>Loading...</div>;
    }

    return (
        <section>
            <div ref={formRef} className={`car-form ${showForm ? 'show' : ''}`}>
                <form onSubmit={handleSubmit}>
                    <div onClick={toggleForm} className="close-form-icon"><IoClose size={36}/></div>
                    <div className="input-div first">
                        <input id="datetime" className="input" type="date" placeholder=" " name="Date"/>
                        <div className="space"></div>
                        <label htmlFor="datetime" className="placeholder">Date</label>
                    </div>
                    <div className="input-div other">
                        <input id="mileage" className="input" type="text" placeholder=" " name="Mileage"
                               value={formData.Mileage}
                               onChange={handleChange}/>
                        <div className="space"></div>
                        <label htmlFor="mileage" className="placeholder">Mileage</label>
                    </div>
                    <div className="input-div other">
                        <input id="typeoffuel" className="input" type="text" placeholder=" " name="TypeOfFuel"
                               value={formData.TypeOfFuel}
                               onChange={handleChange}/>
                        <div className="space"></div>
                        <label htmlFor="typeoffuel" className="placeholder">Type of Fuel</label>
                    </div>
                    <div className="input-div other">
                        <input id="unitprice" className="input" type="text" placeholder=" " name="UnitPrice"
                               value={formData.UnitPrice}
                               onChange={handleChange}/>
                        <div className="space"></div>
                        <label htmlFor="unitprice" className="placeholder">Unit price</label>
                    </div>
                    <div className="input-div other">
                        <input id="totalprice" className="input" type="text" placeholder=" " name="TotalPrice"
                               value={formData.TotalPrice}
                               onChange={handleChange}/>
                        <div className="space"></div>
                        <label htmlFor="totalprice" className="placeholder">Total price</label>
                    </div>
                    <div className="input-div other">
                        <input id="literskwh" className="input" type="text" placeholder=" " name="LitersKwh"
                               value={formData.LitersKwh}
                               onChange={handleChange}/>
                        <div className="space"></div>
                        <label htmlFor="literskwh" className="placeholder">Liters/Kwh</label>
                    </div>
                    <div className="input-div other">
                        <input id="description" className="input" type="text" placeholder=" " name="Description"
                               value={formData.Description}
                               onChange={handleChange}/>
                        <div className="space"></div>
                        <label htmlFor="description" className="placeholder">Description</label>
                    </div>
                    <button type="submit" className="car-form-submit-button">Submit</button>
                </form>
                <button onClick={clearForm} className="car-form-clear-button">Clear values</button>
            </div>
            <div className={`${showForm ? 'content-blur' : ''}`}>
            <h2>Car Details</h2>
                {carDetails.length === 0 ? (
                    <p>0</p>
                ) : (
                    carDetails.map((car) =>
                        <div key={car.id}>
                            <p>Mileage: {car["mileage"]}</p>
                        </div>
                    )
                )}
                <h3>Add Car Details</h3>

                {errMsg && <p className="errmsg">{errMsg}</p>}
                <div onClick={toggleForm} className="car-list-item grid-item create-car">
                    <div>
                        <IoAddCircleOutline size={70}/>
                        <br/>
                        Add Car Detail
                    </div>
                </div>
            </div>
        </section>
    );
}

 export default CarDetails;
