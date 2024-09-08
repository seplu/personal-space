 import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/Axios";

const CarDetails = () => {
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
        <div>
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
            <form onSubmit={handleSubmit}>
                <label>
                    DateTime:
                    <input type="text" name="DateTime" value={formData.DateTime} onChange={handleChange} />
                </label>
                <label>
                    Mileage:
                    <input type="text" name="Mileage" value={formData.Mileage} onChange={handleChange} />
                </label>
                <label>
                    Type of Fuel:
                    <input type="text" name="TypeOfFuel" value={formData.TypeOfFuel} onChange={handleChange} />
                </label>
                <label>
                    Unit Price:
                    <input type="text" name="UnitPrice" value={formData.UnitPrice} onChange={handleChange} />
                </label>
                <label>
                    Total Price:
                    <input type="text" name="TotalPrice" value={formData.TotalPrice} onChange={handleChange} />
                </label>
                <label>
                    Liters/Kwh:
                    <input type="text" name="LitersKwh" value={formData.LitersKwh} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <input type="text" name="Description" value={formData.Description} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CarDetails;
